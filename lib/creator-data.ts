export type CreatorCollection =
  | "eleve-partners"
  | "india-beyond"
  | "worldwide-talent"
  | "d2c-network"
  | "selected-collaborations";

export type Creator = {
  _id: string;
  name: string;
  slug: string;
  profileImage?: string;
  galleryImages: string[];
  shortBio?: string;
  fullBio?: string;
  collection: CreatorCollection;
  niches: string[];
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  instagram?: string;
  youtube?: string;
  otherSocial?: string;
  represented: boolean;
  featured: boolean;
  active: boolean;
  displayOrder: number;
};

export const collectionDetails: Array<{
  id: CreatorCollection;
  number: string;
  title: string;
  description: string;
  imageClass: string;
}> = [
  {
    id: "eleve-partners",
    number: "01",
    title: "Elevé Partners",
    description: "Our core long-term represented talent.",
    imageClass: "talent-collection-partners",
  },
  {
    id: "india-beyond",
    number: "02",
    title: "India & Beyond",
    description: "Creators based across India with audiences and ambitions extending beyond borders.",
    imageClass: "talent-collection-india",
  },
  {
    id: "worldwide-talent",
    number: "03",
    title: "Worldwide Talent",
    description: "Creators and creative voices across international markets.",
    imageClass: "talent-collection-worldwide",
  },
  {
    id: "d2c-network",
    number: "04",
    title: "D2C Network",
    description: "Flexible campaign-ready talent and creator partnerships.",
    imageClass: "talent-collection-d2c",
  },
  {
    id: "selected-collaborations",
    number: "05",
    title: "Selected Collaborations",
    description: "Creators who have worked with Elevé on selected projects or campaigns.",
    imageClass: "talent-collection-collaborations",
  },
];

const groqQuery = `*[_type == "creator" && active == true] | order(displayOrder asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  "profileImage": profileImage.asset->url,
  "galleryImages": coalesce(gallery[].asset->url, []),
  shortBio,
  fullBio,
  collection,
  niches,
  city,
  region,
  country,
  latitude,
  longitude,
  instagram,
  youtube,
  otherSocial,
  represented,
  featured,
  active,
  displayOrder
}`;

function sanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) return null;
  return { projectId, dataset };
}

export async function getCreators(): Promise<Creator[]> {
  const config = sanityConfig();
  if (!config) return [];

  const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
  const endpoint = `https://${config.projectId}.api.sanity.io/v${apiVersion}/data/query/${config.dataset}`;

  try {
    const response = await fetch(`${endpoint}?query=${encodeURIComponent(groqQuery)}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return [];
    const payload = (await response.json()) as { result?: Creator[] };
    return payload.result || [];
  } catch {
    return [];
  }
}

export async function getCreatorBySlug(slug: string): Promise<Creator | null> {
  const creators = await getCreators();
  return creators.find((creator) => creator.slug === slug) || null;
}

export function locationLabel(creator: Creator) {
  return [creator.city, creator.country].filter(Boolean).join(", ") || "Worldwide";
}

export function creatorCoordinates(creators: Creator[]) {
  const grouped = new Map<string, {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    creators: Creator[];
  }>();

  creators.forEach((creator) => {
    if (typeof creator.latitude !== "number" || typeof creator.longitude !== "number") return;
    const key = `${creator.latitude.toFixed(2)}:${creator.longitude.toFixed(2)}`;
    const current = grouped.get(key);
    if (current) {
      current.creators.push(creator);
      return;
    }

    grouped.set(key, {
      city: creator.city || "Unknown city",
      country: creator.country || "Worldwide",
      latitude: creator.latitude,
      longitude: creator.longitude,
      creators: [creator],
    });
  });

  return Array.from(grouped.values());
}
