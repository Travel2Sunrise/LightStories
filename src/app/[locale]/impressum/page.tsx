import { setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Impressum",
    description: "Impressum und rechtliche Informationen",
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1>Impressum</h1>

        <h2>Angaben gem. &sect; 5 TMG</h2>
        <p>
          Thorsten Kolb
          <br />
          Lightstories Fotografie
          <br />
          Musterstra&szlig;e 123
          <br />
          12345 Musterstadt
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: +49 123 456 78
          <br />
          E-Mail: hello@lightstories.de
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gem. &sect; 27 a
          Umsatzsteuergesetz:
          <br />
          DE XXX XXX XXX
        </p>

        <h2>Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV</h2>
        <p>
          Thorsten Kolb
          <br />
          Musterstra&szlig;e 123
          <br />
          12345 Musterstadt
        </p>

        <h2>Streitschlichtung</h2>
        <p>
          Die Europ&auml;ische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>

        <h2>Haftung f&uuml;r Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG
          f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder
          gespeicherte fremde Informationen zu &uuml;berwachen oder nach
          Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit
          hinweisen.
        </p>

        <h2>Haftung f&uuml;r Links</h2>
        <p>
          Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf
          deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir
          f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen.
          F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige
          Anbieter oder Betreiber der Seiten verantwortlich.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die
          Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes
          bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
          Erstellers.
        </p>
      </div>
    </section>
  );
}
