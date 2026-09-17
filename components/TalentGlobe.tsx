"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Creator } from "@/lib/creator-data";
import { creatorCoordinates } from "@/lib/creator-data";

type Props = { creators: Creator[] };

export default function TalentGlobe({ creators }: Props) {
  const locations = useMemo(() => creatorCoordinates(creators), [creators]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, x: 0, y: 0 });
  const selected = locations[selectedIndex];

  const projected = locations.map((location) => ({
    ...location,
    x: 50 + location.longitude / 3.6,
    y: 50 - location.latitude / 1.8,
  }));

  return (
    <div className="talent-globe-layout">
      <div
        className="globe talent-globe"
        onPointerDown={(event) => {
          dragRef.current = { startX: event.clientX, startY: event.clientY, x: rotation.y, y: rotation.x };
          setIsDragging(true);
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          if (!isDragging) return;
          setRotation({
            x: Math.min(18, Math.max(-18, dragRef.current.y + (event.clientY - dragRef.current.startY) * 0.18)),
            y: Math.min(32, Math.max(-32, dragRef.current.x + (event.clientX - dragRef.current.startX) * 0.18)),
          });
        }}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
      >
        <div className="globe-core" style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
          {[...Array(14)].map((_, index) => <span key={index} className="orbital-dot" style={{ transform: `rotate(${index * 26}deg) translateY(-112px)` }} />)}
        </div>
        {projected.map((location, index) => (
          <button
            key={`${location.city}-${location.country}`}
            className={`location-marker talent-location-marker ${index === selectedIndex ? "selected" : ""}`}
            style={{ left: `${Math.max(10, Math.min(90, location.x))}%`, top: `${Math.max(12, Math.min(88, location.y))}%`, transform: `translate(-50%, -50%) scale(${1 + Math.min(location.creators.length, 5) * 0.08})` }}
            aria-label={`Explore talent in ${location.city}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <div className="talent-location-panel">
        {selected ? (
          <>
            <p className="reference-kicker reference-dark-kicker">{selected.city} / {selected.country}</p>
            <h3>{selected.creators.length === 1 ? <>ONE VOICE.<br />ONE CITY.<br /><em>PART OF SOMETHING BIGGER.</em></> : <>THIS CITY<br /><em>HAS SOMETHING TO SAY.</em></>}</h3>
            <p className="talent-location-count">{String(selected.creators.length).padStart(2, "0")} {selected.creators.length === 1 ? "TALENT" : "TALENTS"} IN OUR WORLD</p>
            <div className="talent-location-creators">
              {selected.creators.slice(0, 4).map((creator) => (
                <a href={`/talent/${creator.slug}`} className="talent-location-creator" key={creator._id}>
                  <span className="talent-location-thumb">
                    {creator.profileImage ? <Image src={creator.profileImage} alt="" fill sizes="48px" /> : null}
                  </span>
                  <span><strong>{creator.name}</strong><small>{creator.niches.slice(0, 2).join(" · ") || "Creator"}</small></span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="reference-kicker reference-dark-kicker">India / Worldwide</p>
            <h3>THE WORLD<br /><em>IS OPEN.</em></h3>
            <p className="talent-location-count">PUBLISHED LOCATIONS WILL APPEAR HERE</p>
          </>
        )}
      </div>
    </div>
  );
}
