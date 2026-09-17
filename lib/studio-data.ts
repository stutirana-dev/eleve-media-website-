export type StudioProject = {
  _id: string;
  title: string;
  slug: string;
  projectType?: string;
  year?: string;
  client?: string;
  creator?: string;
  coverImage?: string;
  heroImage?: string;
  gallery: string[];
  video?: string;
  description?: string;
  brief?: string;
  creativeApproach?: string;
  services: string[];
  deliverables: string[];
  credits: string[];
  results?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

const query = `*[_type == "studioProject" && published == true] | order(displayOrder asc, title asc) {
  _id, title, "slug": slug.current, projectType, year, client, creator,
  "coverImage": coverImage.asset->url, "heroImage": heroImage.asset->url,
  "gallery": coalesce(gallery[].asset->url, []), video, description, brief,
  creativeApproach, services, deliverables, credits, results, featured, published, displayOrder
}`;

export async function getStudioProjects(): Promise<StudioProject[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return [];

  try {
    const response = await fetch(`https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    const payload = (await response.json()) as { result?: StudioProject[] };
    return payload.result || [];
  } catch {
    return [];
  }
}

export async function getStudioProject(slug: string) {
  const projects = await getStudioProjects();
  return projects.find((project) => project.slug === slug) || null;
}
