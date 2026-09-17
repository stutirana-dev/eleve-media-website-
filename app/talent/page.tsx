import type { Metadata } from "next";
import TalentDirectory from "@/components/TalentDirectory";
import TalentGlobe from "@/components/TalentGlobe";
import { getCreators } from "@/lib/creator-data";

export const metadata: Metadata = {
  title: "Talent | Elevé Media",
  description: "Explore Elevé Media's global talent index and creator network.",
};

export const revalidate = 60;

export default async function TalentPage() {
  const creators = await getCreators();

  return (
    <main className="talent-page talent-legacy-page">
      <section className="talent-legacy-intro">
        <p className="section-kicker dark-kicker">Elevé talent / Worldwide</p>
        <h1>TALENT,<br /><em>WITHOUT</em><br />BORDERS.</h1>
        <p>A growing network of creators, voices and storytellers represented and connected by Elevé.</p>
        <div className="talent-legacy-meta"><span>India · Worldwide</span><span>{String(creators.length).padStart(2, "0")} active profiles</span></div>
      </section>

      <section className="global-scene talent-legacy-globe-section">
        <div className="scene-intro global-intro">
          <p className="section-kicker dark-kicker">Global talent</p>
          <h2>Talent has no postcode.</h2>
        </div>
        <TalentGlobe creators={creators} />
      </section>

      <TalentDirectory creators={creators} />
    </main>
  );
}
