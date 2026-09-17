import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudioProject, getStudioProjects } from "@/lib/studio-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() { return (await getStudioProjects()).map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const project = await getStudioProject(slug); return project ? { title: `${project.title} | Elevé Studio`, description: project.description || `${project.title} by Elevé Studio.` } : { title: "Studio | Elevé Media" }; }

export default async function StudioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getStudioProject(slug);
  if (!project) notFound();
  const gallery = project.gallery.filter((image) => image !== project.heroImage);
  return <main className="studio-project-page studio-light"><section className="studio-project-hero">{project.heroImage && <Image src={project.heroImage} alt={project.title} fill priority sizes="100vw" />}<div><p className="reference-kicker">{project.projectType || "Studio project"}{project.year ? ` / ${project.year}` : ""}</p><h1 className="reference-title">{project.title}</h1></div></section><section className="studio-project-intro"><p>{project.description}</p><div>{project.client && <p><b>Client</b>{project.client}</p>}{project.creator && <p><b>Creator / Talent</b>{project.creator}</p>}{project.services.length > 0 && <p><b>Services</b>{project.services.join(" · ")}</p>}</div></section>{project.brief && <section className="studio-project-copy"><p className="reference-kicker reference-dark-kicker">The brief</p><h2>{project.brief}</h2></section>}{project.creativeApproach && <section className="studio-project-copy studio-project-dark"><p className="reference-kicker">Creative approach</p><h2>{project.creativeApproach}</h2></section>}{gallery.length > 0 && <section className="studio-project-gallery">{gallery.map((image, index) => <div key={image}><Image src={image} alt={`${project.title} image ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>)}</section>}<section className="studio-project-cta"><h2 className="reference-title dark-title">HAVE SOMETHING<br /><em>IN MIND?</em></h2><Link href="/contact" className="reference-button reference-button-dark">Start a project →</Link></section></main>;
}
