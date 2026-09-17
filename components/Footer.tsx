import Link from "next/link";
import { getSiteSettings, visibleLinks, type SiteLink } from "@/lib/site-settings";

function FooterLink({ link }: { link: SiteLink }) {
  const external = link.openInNewTab || /^https?:\/\//.test(link.url);
  if (external) return <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>;
  return <Link href={link.url}>{link.label}</Link>;
}

function connectLinks(settings: Awaited<ReturnType<typeof getSiteSettings>>) {
  const socialUrls: Record<string, string | undefined> = {
    instagram: settings.instagramUrl,
    linkedin: settings.linkedinUrl,
    youtube: settings.youtubeUrl,
    "x / twitter": settings.twitterUrl,
    other: settings.otherSocialUrl,
  };
  const links = visibleLinks(settings.footerConnectLinks)
    .filter((link) => {
      const configuredSocialUrl = socialUrls[link.label.toLowerCase()];
      return !Object.prototype.hasOwnProperty.call(socialUrls, link.label.toLowerCase()) || Boolean(configuredSocialUrl);
    })
    .map((link) => link.label.toLowerCase() === "email" ? { ...link, url: `mailto:${settings.primaryEmail}` } : link);
  const configuredSocials = [
    ["Instagram", settings.instagramUrl],
    ["LinkedIn", settings.linkedinUrl],
    ["YouTube", settings.youtubeUrl],
    ["X / Twitter", settings.twitterUrl],
    ["Other", settings.otherSocialUrl],
  ] as const;
  const existingLabels = new Set(links.map((link) => link.label.toLowerCase()));
  configuredSocials.forEach(([label, url]) => {
    if (url && !existingLabels.has(label.toLowerCase())) links.push({ label, url, displayOrder: links.length + 1, openInNewTab: true, visible: true });
  });
  return links;
}

export default async function Footer() {
  const settings = await getSiteSettings();
  const connect = connectLinks(settings);
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <div className="footer-brand-block">
          <div className="footer-logo">{settings.footerSmallLabel || settings.shortName}</div>
          <p>{settings.footerSupportingText || settings.footerHeadline}</p>
        </div>

        <a className="footer-email" href={settings.footerCtaUrl || `mailto:${settings.primaryEmail}`}>
          {settings.footerCtaLabel}
        </a>
      </div>

      <div className="footer-grid">
        <div className="footer-column">
          <h2 className="footer-title">Explore</h2>
          <nav aria-label="Explore"><ul className="footer-link-list">{visibleLinks(settings.footerExploreLinks).map((link) => <li key={`${link.label}-${link.url}`}><FooterLink link={link} /></li>)}</ul></nav>
        </div>

        <div className="footer-column">
          <h2 className="footer-title">Connect</h2>
          <nav aria-label="Connect"><ul className="footer-link-list">{connect.map((link) => <li key={`${link.label}-${link.url}`}><FooterLink link={link} /></li>)}</ul></nav>
        </div>

        <div className="footer-column">
          <h2 className="footer-title">Company</h2>
          <nav aria-label="Company"><ul className="footer-link-list">{visibleLinks(settings.footerCompanyLinks).map((link) => <li key={`${link.label}-${link.url}`}><FooterLink link={link} /></li>)}</ul></nav>
        </div>

        <div className="footer-column">
          <h2 className="footer-title">{settings.workingHoursLabel}</h2>
          <div className="footer-hours">
            <span>{settings.workingDays}</span>
            <span>{settings.workingTime} {settings.timezone}</span>
            {settings.workingHoursNote && <span>{settings.workingHoursNote}</span>}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {settings.companyName}</span>
        <span>{settings.locationPresence}</span>
      </div>
    </footer>
  );
}
