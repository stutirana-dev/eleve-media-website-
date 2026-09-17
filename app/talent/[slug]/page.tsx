import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCreatorBySlug, getCreators, locationLabel } from "@/lib/creator-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const creators = await getCreators();
  return creators.map((creator) => ({ slug: creator.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const creator = await getCreatorBySlug(slug);
  if (!creator) return { title: "Talent | Elevé Media" };
  return { title: `${creator.name} | Elevé Media`, description: creator.shortBio || `Discover ${creator.name} with Elevé Media.` };
}

export default async function CreatorProfilePage({ params }: Props) {
  const { slug } = await params;
  const creator = await getCreatorBySlug(slug);
  if (!creator) notFound();

  const gallery = creator.galleryImages.filter((image) => image !== creator.profileImage);
  const socials = [
    ["Instagram", creator.instagram],
    ["YouTube", creator.youtube],
    ["Other social", creator.otherSocial],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <main className="creator-profile-page reference-light-section">
      <section className="creator-profile-hero">
        <div className="creator-profile-image">{creator.profileImage ? <Image src={creator.profileImage} alt={`${creator.name} profile portrait`} fill priority sizes="(max-width: 800px) 100vw, 55vw" /> : null}</div>
        <div className="creator-profile-intro"><p className="reference-kicker reference-dark-kicker">Elevé talent / {creator.collection.replaceAll("-", " ")}</p><h1 className="reference-title dark-title">{creator.name}</h1><p className="creator-profile-location">{locationLabel(creator)}</p><div className="creator-niches">{creator.niches.map((niche) => <span key={niche}>{niche}</span>)}</div></div>
      </section>

      {(creator.shortBio || creator.fullBio) && <section className="creator-profile-bio"><p className="reference-kicker reference-dark-kicker">A closer look</p><h2>{creator.shortBio}</h2>{creator.fullBio && <p>{creator.fullBio}</p>}</section>}

      {gallery.length > 0 && <section className="creator-profile-gallery"><p className="reference-kicker reference-dark-kicker">Selected images</p><div>{gallery.map((image, index) => <div key={image}><Image src={image} alt={`${creator.name} gallery image ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 33vw" /></div>)}</div></section>}

      {socials.length > 0 && <section className="creator-profile-socials"><p className="reference-kicker reference-dark-kicker">Find {creator.name}</p>{socials.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label} <span>↗</span></a>)}</section>}

      <section className="creator-profile-cta"><p className="reference-kicker">Work with talent</p><h2 className="reference-title">MAKE ROOM<br /><em>FOR WHAT&apos;S NEXT.</em></h2><Link href={`/contact?talent=${creator.slug}`} className="reference-button reference-button-dark">Work with {creator.name} <span>↗</span></Link></section>
    </main>
  );
}
