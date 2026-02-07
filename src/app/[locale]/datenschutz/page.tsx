import { setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Datenschutz",
    description: "Datenschutzerklärung",
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1>Datenschutzerkl&auml;rung</h1>

        <h2>1. Datenschutz auf einen Blick</h2>

        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen &Uuml;berblick
          dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie
          diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
          denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>
            Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser
            Website?
          </strong>
        </p>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den
          Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Impressum
          dieser Website entnehmen.
        </p>

        <p>
          <strong>Wie erfassen wir Ihre Daten?</strong>
        </p>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
          mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein
          Kontaktformular eingeben.
        </p>

        <h2>2. Hosting</h2>
        <p>
          Wir hosten die Inhalte unserer Website bei Vercel Inc. Anbieter ist
          die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
        </p>

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen
          Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
          vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
          sowie dieser Datenschutzerkl&auml;rung.
        </p>

        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser
          Website ist:
        </p>
        <p>
          Thorsten Kolb
          <br />
          Musterstra&szlig;e 123
          <br />
          12345 Musterstadt
        </p>
        <p>
          Telefon: +49 123 456 78
          <br />
          E-Mail: hello@lightstories.de
        </p>

        <h2>4. Datenerfassung auf dieser Website</h2>

        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
          Angaben aus dem Anfrageformular inklusive der von Ihnen dort
          angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r
          den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
          wir nicht ohne Ihre Einwilligung weiter.
        </p>
        <p>
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
          lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines
          Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung
          vorvertraglicher Ma&szlig;nahmen erforderlich ist.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber
          Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten
          personenbezogenen Daten zu erhalten. Sie haben au&szlig;erdem ein
          Recht, die Berichtigung oder L&ouml;schung dieser Daten zu verlangen.
        </p>
        <p>
          Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
          k&ouml;nnen Sie diese Einwilligung jederzeit f&uuml;r die Zukunft
          widerrufen. Au&szlig;erdem haben Sie das Recht, unter bestimmten
          Umst&auml;nden die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </p>
      </div>
    </section>
  );
}
