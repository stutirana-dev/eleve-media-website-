export type SiteLink = {
  label: string;
  url: string;
  displayOrder?: number;
  openInNewTab?: boolean;
  visible?: boolean;
};

export type SiteSettings = {
  companyName: string;
  shortName: string;
  tagline: string;
  primaryEmail: string;
  phoneNumber?: string;
  locationPresence: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  otherSocialUrl?: string;
  workingHoursLabel: string;
  workingDays: string;
  workingTime: string;
  timezone: string;
  workingHoursNote?: string;
  navigationLinks: SiteLink[];
  footerExploreLinks: SiteLink[];
  footerConnectLinks: SiteLink[];
  footerCompanyLinks: SiteLink[];
  footerSmallLabel: string;
  footerHeadline: string;
  footerSupportingText?: string;
  footerCtaLabel: string;
  footerCtaUrl: string;
};

const fallback: SiteSettings = {
  companyName: "Elevé Media",
  shortName: "Elevé",
  tagline: "The people behind the creators you see online.",
  primaryEmail: "helloelevemedia.in@gmail.com",
  locationPresence: "India / Worldwide",
  workingHoursLabel: "WORKING HOURS",
  workingDays: "MON — FRI",
  workingTime: "10:00 AM — 6:00 PM",
  timezone: "IST",
  navigationLinks: [
    { label: "Talent", url: "/talent", displayOrder: 1, visible: true },
    { label: "For Creators", url: "/creators", displayOrder: 2, visible: true },
    { label: "For Brands", url: "/brands", displayOrder: 3, visible: true },
    { label: "Studio", url: "/studio", displayOrder: 4, visible: true },
    { label: "About", url: "/about", displayOrder: 5, visible: true },
  ],
  footerExploreLinks: [
    { label: "About", url: "/about", displayOrder: 1, visible: true },
    { label: "Creators", url: "/creators", displayOrder: 2, visible: true },
    { label: "Brands", url: "/brands", displayOrder: 3, visible: true },
    { label: "Roster", url: "/roster", displayOrder: 4, visible: true },
    { label: "Why Us", url: "/why-us", displayOrder: 5, visible: true },
    { label: "Journal", url: "/journal", displayOrder: 6, visible: true },
  ],
  footerConnectLinks: [{ label: "Email", url: "mailto:helloelevemedia.in@gmail.com", displayOrder: 1, visible: true }],
  footerCompanyLinks: [
    { label: "Careers", url: "/careers", displayOrder: 1, visible: true },
    { label: "Contact", url: "/contact", displayOrder: 2, visible: true },
    { label: "Privacy", url: "/privacy", displayOrder: 3, visible: true },
    { label: "Terms", url: "/terms", displayOrder: 4, visible: true },
  ],
  footerSmallLabel: "Elevé Media",
  footerHeadline: "The people behind the creators you see online.",
  footerCtaLabel: "Let's talk ↗",
  footerCtaUrl: "mailto:helloelevemedia.in@gmail.com",
};

const query = `*[_type == "siteSettings"][0]{
  companyName, shortName, tagline, primaryEmail, phoneNumber, locationPresence,
  instagramUrl, linkedinUrl, youtubeUrl, twitterUrl, otherSocialUrl,
  workingHoursLabel, workingDays, workingTime, timezone, workingHoursNote,
  navigationLinks, footerExploreLinks, footerConnectLinks, footerCompanyLinks,
  footerSmallLabel, footerHeadline, footerSupportingText, footerCtaLabel, footerCtaUrl
}`;

function mergeSettings(value: Partial<SiteSettings> | null | undefined): SiteSettings {
  return {
    ...fallback,
    ...value,
    navigationLinks: value?.navigationLinks?.length ? value.navigationLinks : fallback.navigationLinks,
    footerExploreLinks: value?.footerExploreLinks?.length ? value.footerExploreLinks : fallback.footerExploreLinks,
    footerConnectLinks: value?.footerConnectLinks?.length ? value.footerConnectLinks : fallback.footerConnectLinks,
    footerCompanyLinks: value?.footerCompanyLinks?.length ? value.footerCompanyLinks : fallback.footerCompanyLinks,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return fallback;

  try {
    const response = await fetch(`https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`, { next: { revalidate: 60 } });
    if (!response.ok) return fallback;
    const payload = (await response.json()) as { result?: Partial<SiteSettings> };
    return mergeSettings(payload.result);
  } catch {
    return fallback;
  }
}

export function visibleLinks(links: SiteLink[]) {
  return links.filter((link) => link.visible !== false && link.label && link.url).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}
