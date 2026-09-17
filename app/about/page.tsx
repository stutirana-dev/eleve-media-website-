import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Elevé Media — an independent global talent management agency built around creators, long-term partnerships and aligned growth.",
};

export default function AboutPage() {
  return (
    <main className="about-page">

      <section className="about-hero">
        <p className="about-index">ABOUT / 01</p>

        <h1>
          Two founders.
          <br />
          <span>One dream.</span>
        </h1>

        <div className="about-hero-bottom">
          <p>
            Elevé began with a simple belief:
            creators deserve people behind them
            who are as invested in their growth as they are.
          </p>

          <span>Scroll ↓</span>
        </div>
      </section>

      <section className="about-manifesto">
        <p className="about-index">WHY WE EXIST</p>

        <h2>
          Not another agency
          <br />
          between the creator
          <br />
          <span>and the opportunity.</span>
        </h2>

        <div className="about-copy">
          <div></div>

          <div>
            <p>
              We built Elevé to work differently. No upfront representation
              fees. No relationship that begins with an invoice.
            </p>

            <p>
              We grow when our creators grow. That alignment shapes how we
              negotiate, build partnerships and think about careers.
            </p>
          </div>
        </div>
      </section>

      <section className="founder-visual">
        <div className="founder-panel founder-panel-one">
          <span>01</span>
          <div>
            <small>THE BEGINNING</small>
            <p>Different perspectives.</p>
          </div>
        </div>

        <div className="founder-cross">×</div>

        <div className="founder-panel founder-panel-two">
          <span>02</span>
          <div>
            <small>THE VISION</small>
            <p>One direction.</p>
          </div>
        </div>
      </section>

      <section className="about-global">
        <p className="about-index">NO BORDERS</p>

        <div className="about-global-grid">
          <h2>
            Talent is
            <br />
            everywhere.
          </h2>

          <div>
            <p>
              Elevé isn't being built as an India-only roster.
            </p>

            <p>
              Our ambition is to connect creators, audiences and brands across
              cities, countries and cultures — without losing the personal
              relationship that good representation requires.
            </p>
          </div>
        </div>

        <div className="world-word">
          WORLD
          <span>WIDE</span>
        </div>
      </section>

      <section className="about-closing">
        <p>THE ELEVÉ PRINCIPLE</p>

        <h2>
          Your talent.
          <br />
          Your career.
          <br />
          <span>Our responsibility.</span>
        </h2>

        <div>
          <Link href="/creators" className="pill">
            Work with Elevé
          </Link>

          <Link href="/roster" className="pill">
            Meet our talent
          </Link>
        </div>
      </section>

    </main>
  );
}
