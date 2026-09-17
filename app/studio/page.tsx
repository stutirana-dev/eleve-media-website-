import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StudioCapabilities from "@/components/StudioCapabilities";
import { getStudioProjects } from "@/lib/studio-data";

export const metadata: Metadata = { title: "Studio | Elevé Media", description: "Elevé Studio — creative direction, video production, photography, social-first content and campaign production for brands and creators." };

const process = [["01", "DISCOVER", "The brief, audience and objective."], ["02", "DEVELOP", "Concept, direction and creative approach."], ["03", "PREPARE", "Planning, production requirements and execution."], ["04", "CREATE", "Shoot, capture and produce."], ["05", "REFINE", "Edit, finish and adapt."], ["06", "DELIVER", "Final content prepared for its intended platforms."]];
const behindImages = ["eleve-editorial-01.jpg", "eleve-editorial-02.jpg", "eleve-editorial-03.jpg", "eleve-editorial-02.jpg", "eleve-editorial-01.jpg", "eleve-editorial-03.jpg", "eleve-editorial-01.jpg", "eleve-editorial-02.jpg"];

export default async function StudioPage() {
  const projects = await getStudioProjects();
  return <main className="studio-page">
    <section className="studio-hero studio-dark"><div className="studio-hero-large"><Image src="/images/eleve/eleve-editorial-03.jpg" alt="Cinematic editorial production image" fill priority sizes="80vw" /></div><div className="studio-hero-small"><Image src="/images/eleve/eleve-editorial-01.jpg" alt="Editorial portrait from a production set" fill sizes="30vw" /></div><div className="studio-hero-shade" /><div className="studio-hero-copy"><p className="reference-kicker">Elevé / Studio<br />Creative production</p><h1 className="reference-title">IDEAS,<br /><em>MADE</em><br />VISIBLE.</h1><p>Creative production and culture-led content built for brands and talent.</p><Link href="#selected-work" className="reference-button reference-button-light">Explore the work ↓</Link></div></section>

    <section className="studio-statement studio-light" data-reveal><p className="reference-kicker reference-dark-kicker">What we make / 01</p><div className="studio-statement-grid"><h2 className="reference-title dark-title">FROM AN IDEA<br />TO SOMETHING<br /><em>PEOPLE REMEMBER.</em></h2><div><p>Elevé Studio brings creative direction, production and social-first thinking together to create work designed for today&apos;s platforms and audiences.</p><Image src="/images/eleve/eleve-editorial-02.jpg" alt="Editorial creator image" width={700} height={880} /></div></div></section>

    <section id="selected-work" className="studio-work studio-dark"><p className="reference-kicker">Selected work</p><div className="studio-work-heading"><h2 className="reference-title">SELECTED<br /><em>WORK.</em></h2><p>{projects.length ? "Published projects from Elevé Studio." : "Selected work coming into focus."}</p></div>{projects.length ? <div className="studio-project-list">{projects.map((project, index) => <Link href={`/studio/${project.slug}`} className={`studio-project studio-project-${index + 1}`} key={project._id}><div>{project.coverImage ? <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 800px) 100vw, 60vw" /> : null}</div><span>{String(index + 1).padStart(2, "0")} / {project.projectType || "STUDIO PROJECT"}</span><h3>{project.title}</h3><b>View project ↗</b></Link>)}</div> : <div className="studio-empty-work"><span>SELECTED WORK</span><h3>COMING INTO<br /><em>FOCUS.</em></h3><p>Project stories will appear here as genuine Studio work is approved for publication.</p></div>}</section>

    <section className="studio-capabilities studio-light"><p className="reference-kicker reference-dark-kicker">Capabilities / 02</p><h2 className="reference-title dark-title">WHAT WE<br /><em>BRING TO<br />THE FRAME.</em></h2><StudioCapabilities /></section>

    <section className="studio-cinematic"><Image src="/images/eleve/eleve-editorial-01.jpg" alt="Cinematic production portrait" fill sizes="100vw" /><div><p className="reference-kicker">Creative production</p><h2 className="reference-title">MADE TO<br /><em>BE SEEN.</em></h2></div></section>

    <section className="studio-process studio-dark"><p className="reference-kicker">Process / 03</p><h2 className="reference-title">FROM<br /><em>THOUGHT</em><br />TO FRAME.</h2><div className="studio-process-list">{process.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><b>↓</b></article>)}</div></section>

    <section className="studio-behind studio-light"><p className="reference-kicker reference-dark-kicker">Behind the frame</p><h2 className="reference-title dark-title">BEHIND<br /><em>THE FRAME.</em></h2><div className="studio-photo-wall">{behindImages.map((image, index) => <div className={`studio-wall-image studio-wall-${index + 1}`} key={`${image}-${index}`}><Image src={`/images/eleve/${image}`} alt="Editorial production atmosphere" fill sizes="(max-width: 800px) 50vw, 25vw" /></div>)}</div></section>

    <div className="studio-ticker studio-dark" aria-label="Studio capabilities"><span>CREATIVE DIRECTION ·</span><span>FILM ·</span><span>PHOTOGRAPHY ·</span><span>SOCIAL ·</span><span>POST ·</span><span>CAMPAIGNS ·</span><span>CONTENT ·</span><span>PRODUCTION ·</span></div>

    <section className="studio-bridge studio-light"><p className="reference-kicker reference-dark-kicker">The conversation</p><h2 className="reference-title dark-title">TALENT.<br />BRANDS.<br /><em>CREATIVE.</em><br /><br />THAT&apos;S WHERE<br /><em>WE COME IN.</em></h2><p>Elevé brings talent relationships and creative execution into the same conversation.</p><div><Link href="/brands" className="text-link dark-link">For brands <span>↗</span></Link><Link href="/talent" className="text-link dark-link">Our talent <span>↗</span></Link></div></section>

    <section className="studio-final studio-dark"><Image src="/images/eleve/eleve-editorial-02.jpg" alt="Editorial production image" fill sizes="100vw" /><div className="studio-final-shade" /><div><p className="reference-kicker">Have something in mind?</p><h2 className="reference-title">LET&apos;S<br /><em>MAKE IT<br />REAL.</em></h2><p>From creator-led campaigns to original content and production, start with the idea.</p><Link href="/contact" className="reference-button reference-button-light">Start a project →</Link><Link href="/brands" className="studio-final-link">Work with Elevé ↗</Link></div></section>
  </main>;
}
