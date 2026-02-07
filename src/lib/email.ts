import { Resend } from "resend";

// Only instantiate Resend when API key is available
const getResend = () => {
  if (process.env.RESEND_API_KEY) {
    return new Resend(process.env.RESEND_API_KEY);
  }
  return null;
};

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  category: string;
  date?: string;
  message: string;
}

const categoryLabels: Record<string, string> = {
  hochzeit: "Hochzeitsfotografie",
  portrait: "Portraitfotografie",
  familie: "Familienfotografie",
};

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, category, date, message } = data;

  const emailContent = `
Neue Anfrage über die Website

Name: ${name}
E-Mail: ${email}
${phone ? `Telefon: ${phone}` : ""}
Kategorie: ${categoryLabels[category] || category}
${date ? `Wunschtermin: ${date}` : ""}

Nachricht:
${message}
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #8b7355; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .message { background: white; padding: 15px; border-left: 3px solid #8b7355; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Neue Anfrage</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${name}
      </div>
      <div class="field">
        <span class="label">E-Mail:</span> <a href="mailto:${email}">${email}</a>
      </div>
      ${phone ? `<div class="field"><span class="label">Telefon:</span> ${phone}</div>` : ""}
      <div class="field">
        <span class="label">Kategorie:</span> ${categoryLabels[category] || category}
      </div>
      ${date ? `<div class="field"><span class="label">Wunschtermin:</span> ${date}</div>` : ""}
      <div class="message">
        <span class="label">Nachricht:</span>
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  const recipientEmail = process.env.CONTACT_EMAIL || "hello@lightstories.de";

  // Use Resend if API key is configured
  const resend = getResend();
  if (resend) {
    const result = await resend.emails.send({
      from: "Lightstories Website <noreply@lightstories.de>",
      to: recipientEmail,
      replyTo: email,
      subject: `Neue Anfrage: ${categoryLabels[category] || category} - ${name}`,
      text: emailContent,
      html: htmlContent,
    });

    return result;
  }

  // Fallback: Log to console for development
  console.log("=== Contact Form Submission ===");
  console.log(emailContent);
  console.log("================================");

  return { data: { id: "development-mode" }, error: null };
}
