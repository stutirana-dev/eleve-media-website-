"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Creator } from "@/lib/creator-data";
import { collectionDetails, locationLabel } from "@/lib/creator-data";

const niches = ["All", "Fashion", "Beauty", "Lifestyle", "Business", "Tech", "Fitness", "Travel", "Entertainment", "Culture", "Other"];

type Props = { creators: Creator[] };

export default function TalentDirectory({ creators }: Props) {
  const [niche, setNiche] = useState("All");
  const [collection, setCollection] = useState("All");
  const [location, setLocation] = useState("All");

  const locations = useMemo(() => Array.from(new Set(creators.map((creator) => creator.country).filter(Boolean))), [creators]);
  const filteredCreators = creators.filter((creator) => {
    const matchesNiche = niche === "All" || creator.niches.includes(niche);
    const matchesCollection = collection === "All" || creator.collection === collection;
    const matchesLocation = location === "All" || creator.country === location;
    return matchesNiche && matchesCollection && matchesLocation;
  });

  return (
    <section className="talent-index-section reference-light-section">
      <div className="reference-section-top">
        <p className="reference-kicker reference-dark-kicker">The directory</p>
        <span className="reference-index">THE INDEX.</span>
      </div>
      <div className="talent-index-heading">
        <h2 className="reference-title dark-title">THE<br /><em>INDEX.</em></h2>
        <p>Profiles, perspectives and people worth watching. The index grows as our roster does.</p>
      </div>

      <div className="talent-filters" aria-label="Filter talent">
        <div className="talent-filter-line">
          {niches.map((option) => <button type="button" className={option === niche ? "active" : ""} onClick={() => setNiche(option)} key={option}>{option}</button>)}
        </div>
        <div className="talent-selects">
          <label>Collection<select value={collection} onChange={(event) => setCollection(event.target.value)}><option value="All">All collections</option>{collectionDetails.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label>
          <label>Location<select value={location} onChange={(event) => setLocation(event.target.value)}><option value="All">All locations</option>{locations.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        </div>
      </div>

      {filteredCreators.length > 0 ? (
        <div className="talent-directory-grid">
          {filteredCreators.map((creator) => <a className="talent-directory-card" href={`/talent/${creator.slug}`} key={creator._id}><div className="talent-directory-image">{creator.profileImage ? <Image src={creator.profileImage} alt={`${creator.name} profile portrait`} fill sizes="(max-width: 800px) 50vw, 25vw" /> : <span className="talent-image-empty">Image forthcoming</span>}</div><div className="talent-directory-meta"><span>{creator.name}</span><span>{creator.niches.slice(0, 2).join(" · ") || "Creator"}</span><small>{locationLabel(creator)}</small><b>View profile ↗</b></div></a>)}
        </div>
      ) : (
        <div className="talent-empty-index"><span>THE INDEX IS OPEN.</span><h3>Our next chapter<br /><em>starts here.</em></h3><p>Talent profiles will appear as Elevé partners are published. This directory is built to grow with the people we represent.</p></div>
      )}
    </section>
  );
}
