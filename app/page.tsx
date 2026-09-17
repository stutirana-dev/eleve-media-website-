"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ImageAsset = {
  src: string;
  alt: string;
};

type TalentLocation = {
  id: string;
  city: string;
  country: string;
  x: number;
  y: number;
};

const imageData = {
  hero: {
    src: "/images/eleve/eleve-editorial-02.jpg",
    alt: "Monochrome editorial fashion portrait",
  },
  role: {
    src: "/images/eleve/eleve-editorial-01.jpg",
    alt: "Indian fashion portrait in dramatic editorial light",
  },
  services: [
    { src: "/images/eleve/eleve-editorial-02.jpg", alt: "Monochrome fashion figure in a sculptural look" },
    { src: "/images/eleve/eleve-editorial-03.jpg", alt: "Indian fashion portrait with traditional jewelry" },
    { src: "/images/eleve/eleve-editorial-01.jpg", alt: "Indian portrait in a red and gold editorial look" },
  ],
  work: [
    { src: "/images/eleve/eleve-editorial-03.jpg", alt: "Indian fashion portrait for a creator partnership" },
    { src: "/images/eleve/eleve-editorial-02.jpg", alt: "Monochrome fashion portrait for a brand campaign" },
    { src: "/images/eleve/eleve-editorial-01.jpg", alt: "Indian fashion portrait for a creative production" },
  ],
  closing: {
    src: "/images/eleve/eleve-editorial-02.jpg",
    alt: "Monochrome fashion portrait for the closing editorial image",
  },
} satisfies {
  hero: ImageAsset;
  role: ImageAsset;
  services: ImageAsset[];
  work: ImageAsset[];
  closing: ImageAsset;
};

const talentShowcase = [
  { name: "Talent 01", category: "Fashion / Editorial", image: "/images/eleve/eleve-editorial-02.jpg", alt: "Monochrome editorial fashion portrait" },
  { name: "Talent 02", category: "Culture / Beauty", image: "/images/eleve/eleve-editorial-03.jpg", alt: "Indian fashion portrait with traditional jewelry" },
  { name: "Talent 03", category: "Portrait / Storytelling", image: "/images/eleve/eleve-editorial-01.jpg", alt: "Indian portrait in dramatic light" },
  { name: "Talent 04", category: "Fashion / Performance", image: "/images/eleve/eleve-editorial-02.jpg", alt: "Monochrome fashion figure in motion" },
];

const globeLocations: TalentLocation[] = [
  { id: "london", city: "London", country: "United Kingdom", x: 48, y: 28 },
  { id: "dubai", city: "Dubai", country: "UAE", x: 62, y: 38 },
  { id: "mumbai", city: "Mumbai", country: "India", x: 70, y: 52 },
  { id: "sao-paulo", city: "São Paulo", country: "Brazil", x: 41, y: 68 },
  { id: "los-angeles", city: "Los Angeles", country: "United States", x: 22, y: 42 },
  { id: "singapore", city: "Singapore", country: "Singapore", x: 78, y: 58 },
];

const services = [
  { number: "01", title: "TALENT\nMANAGEMENT", copy: "Representation, negotiations, campaign management and career strategy." },
  { number: "02", title: "BRAND\nPARTNERSHIPS", copy: "The right creators. Meaningful campaigns." },
  { number: "03", title: "CAREER\nGROWTH", copy: "Positioning creators for the long term." },
];

const workItems = [
  { number: "01", label: "CREATOR PARTNERSHIP", title: "People first. Always.", image: imageData.work[0] },
  { number: "02", label: "BRAND CAMPAIGN", title: "The right voice for the story.", image: imageData.work[1] },
  { number: "03", label: "CREATIVE PRODUCTION", title: "Make the work matter.", image: imageData.work[2] },
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(globeLocations[2]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      setRotation({
        x: Math.min(18, Math.max(-18, dragRef.current.y + dy * 0.18)),
        y: Math.min(32, Math.max(-32, dragRef.current.x + dx * 0.18)),
      });
    };
    const onPointerUp = () => setIsDragging(false);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging]);

  return (
    <main className="home-page reference-home">
      <section className="reference-hero" aria-label="Elevé Media introduction">
        <div className="reference-hero-image" style={{ transform: `translate3d(0, ${Math.min(scrollY * 0.08, 52)}px, 0)` }}>
          <Image src={imageData.hero.src} alt={imageData.hero.alt} fill priority sizes="100vw" />
        </div>
        <div className="reference-hero-shade" />
        <div className="reference-hero-content">
          <p className="reference-kicker hero-reveal">ELEVÉ MEDIA / INDIA</p>
          <h1 className="reference-title hero-reveal hero-delay-one">THE PEOPLE BEHIND<br />THE CREATORS<br />YOU SEE ONLINE.</h1>
          <p className="reference-hero-description hero-reveal hero-delay-two">Creator Management &amp; Talent Representation</p>
          <div className="reference-actions hero-reveal hero-delay-three">
            <Link href="/creators" className="reference-button reference-button-light">Join Elevé <span>↗</span></Link>
            <Link href="/contact" className="reference-button reference-button-outline">Work with us <span>↗</span></Link>
          </div>
          <div className="reference-hero-footer hero-reveal hero-delay-four"><span>01 / 06</span><span>Scroll to explore ↓</span><span>India · Worldwide</span></div>
        </div>
      </section>

      <section className="role-section reference-light-section">
        <div className="reference-section-top" data-reveal><p className="reference-kicker reference-dark-kicker">Our role</p><span className="reference-index">02 / 06</span></div>
        <div className="role-layout">
          <div className="role-copy" data-reveal>
            <h2 className="reference-title dark-title">YOU CREATE.<br /><em>WE ELEVATE.</em></h2>
            <p>Strategic representation for creators building something bigger.</p>
            <Link href="/about" className="text-link dark-link">More about Elevé <span>↗</span></Link>
          </div>
          <div className="role-image editorial-image" data-reveal style={{ transform: `translateY(${Math.min(scrollY * -0.045, 0)}px)` }}><Image src={imageData.role.src} alt={imageData.role.alt} fill sizes="(max-width: 800px) 100vw, 44vw" /><span className="image-caption">Creator / Elevé archive</span></div>
        </div>
      </section>

      <section className="services-editorial reference-dark-section">
        <div className="reference-section-top" data-reveal><p className="reference-kicker">What we do</p><span className="reference-index">03 / 06</span></div>
        <div className="services-heading" data-reveal><h2 className="reference-title">WE MAKE<br /><em>ROOM</em> FOR<br />WHAT&apos;S NEXT.</h2></div>
        <div className="services-list">
          {services.map((service, index) => <article className="service-row" data-reveal key={service.number}><span className="service-number">{service.number}</span><h3>{service.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p>{service.copy}</p><div className="service-image editorial-image"><Image src={imageData.services[index].src} alt={imageData.services[index].alt} fill sizes="(max-width: 800px) 100vw, 24vw" /></div><span className="service-arrow">↗</span></article>)}
        </div>
      </section>

      <section id="selected-talent" className="talent-editorial reference-light-section">
        <div className="reference-section-top" data-reveal><p className="reference-kicker reference-dark-kicker">The roster</p><span className="reference-index">04 / 06</span></div>
        <div className="talent-heading" data-reveal><h2 className="reference-title dark-title">SELECTED<br /><em>TALENT.</em></h2><p>Placeholder portraits for presentation only.<br />Our people are the point.</p></div>
        <div className="talent-roster-grid">
          {talentShowcase.map((person, index) => <article className={`talent-roster-item talent-roster-${index + 1}`} data-reveal key={person.name}><div className="talent-roster-image editorial-image"><Image src={person.image} alt={person.alt} fill sizes="(max-width: 800px) 100vw, 32vw" /></div><div className="talent-roster-meta"><span>{person.name}</span><span>{person.category}</span></div></article>)}
        </div>
        <Link href="/roster" className="text-link dark-link roster-link" data-reveal>View the roster <span>↗</span></Link>
      </section>

      <section className="global-editorial reference-dark-section">
        <div className="reference-section-top" data-reveal><p className="reference-kicker">Worldwide</p><span className="reference-index">05 / 06</span></div>
        <div className="global-heading" data-reveal><h2 className="reference-title">FROM INDIA.<br /><em>TO EVERYWHERE.</em></h2><p>India / Worldwide</p></div>
        <div className="global-stage">
          <div className="globe globe-reference" onPointerDown={(event) => { dragRef.current = { startX: event.clientX, startY: event.clientY, x: rotation.y, y: rotation.x }; setIsDragging(true); event.preventDefault(); }}>
            <div className="globe-core" style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>{[...Array(14)].map((_, index) => <span key={index} className="orbital-dot" style={{ transform: `rotate(${index * 26}deg) translateY(-112px)` }} />)}</div>
            {globeLocations.map((location) => <button key={location.id} type="button" aria-label={`View ${location.city}`} className={`location-marker ${selectedLocation.id === location.id ? "selected" : ""}`} style={{ left: `${location.x}%`, top: `${location.y}%` }} onClick={() => setSelectedLocation(location)} />)}
          </div>
          <div className="global-location" data-reveal><span className="location-pulse" /><p>{selectedLocation.city}</p><span>{selectedLocation.country}</span><small>Drag to explore our world</small></div>
        </div>
      </section>

      <section className="photo-break editorial-image"><Image src={imageData.work[2].src} alt="Cinematic lifestyle creator portrait" fill sizes="100vw" /><div className="photo-break-overlay" /><div className="photo-break-copy" data-reveal><p className="reference-kicker">Beyond borders</p><h2 className="reference-title">TALENT HAS<br /><em>NO POSTCODE.</em></h2></div></section>

      <section className="philosophy-section reference-light-section" data-reveal><p className="reference-kicker reference-dark-kicker">Our philosophy</p><h2 className="reference-title dark-title">WE EARN<br />WHEN <em>YOU</em><br />EARN.</h2><p className="philosophy-copy">Your growth creates ours.</p></section>

      <section className="work-editorial reference-dark-section">
        <div className="reference-section-top" data-reveal><p className="reference-kicker">Selected work</p><span className="reference-index">06 / 06</span></div>
        <div className="work-heading" data-reveal><h2 className="reference-title">MADE TO<br /><em>MOVE.</em></h2><p>Temporary campaign imagery.<br />Real stories, soon.</p></div>
        <div className="work-list">{workItems.map((item) => <article className="work-item" data-reveal key={item.number}><div className="work-image editorial-image"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className="work-meta"><span>{item.number} / {item.label}</span><h3>{item.title}</h3><span className="work-arrow">↗</span></div></article>)}</div>
      </section>

      <section className="final-editorial"><div className="final-image editorial-image"><Image src={imageData.closing.src} alt={imageData.closing.alt} fill sizes="100vw" /></div><div className="final-shade" /><div className="final-copy" data-reveal><p className="reference-kicker">Start here</p><h2 className="reference-title">LET&apos;S<br /><em>ELEVATE.</em></h2><div className="final-actions"><Link href="/creators" className="reference-button reference-button-light">I&apos;m a creator <span>↗</span></Link><Link href="/brands" className="reference-button reference-button-outline">I&apos;m a brand <span>↗</span></Link></div></div></section>
    </main>
  );
}
