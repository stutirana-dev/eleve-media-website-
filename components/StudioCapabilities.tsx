"use client";

import Image from "next/image";
import { useState } from "react";

const capabilities = [
  ["01", "CREATIVE DIRECTION", "Concept development, visual direction and campaign thinking.", "/images/eleve/eleve-editorial-01.jpg"],
  ["02", "VIDEO PRODUCTION", "Social films, creator-led content, campaign videos and digital production.", "/images/eleve/eleve-editorial-03.jpg"],
  ["03", "PHOTOGRAPHY", "Campaign, creator, product and editorial photography.", "/images/eleve/eleve-editorial-02.jpg"],
  ["04", "SOCIAL-FIRST CONTENT", "Content designed specifically around modern social platforms and audiences.", "/images/eleve/eleve-editorial-01.jpg"],
  ["05", "POST PRODUCTION", "Editing, finishing and content adaptation.", "/images/eleve/eleve-editorial-03.jpg"],
  ["06", "CAMPAIGN PRODUCTION", "Supporting creative execution from initial concept through final deliverables.", "/images/eleve/eleve-editorial-02.jpg"],
];

export default function StudioCapabilities() {
  const [active, setActive] = useState(0);
  const selected = capabilities[active];
  return <div className="studio-capabilities-layout"><div className="studio-capability-list">{capabilities.map(([number, title], index) => <button type="button" className={index === active ? "active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} key={number}><span>{number}</span><strong>{title}</strong><b>↗</b></button>)}</div><div className="studio-capability-visual"><Image key={selected[0]} src={selected[3]} alt={`${selected[1].toLowerCase()} capability`} fill sizes="(max-width: 800px) 100vw, 55vw" /><div><span>{selected[0]} / {selected[1]}</span><p>{selected[2]}</p></div></div></div>;
}
