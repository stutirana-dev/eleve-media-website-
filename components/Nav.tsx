import Link from "next/link";
import { getSiteSettings, visibleLinks, type SiteLink } from "@/lib/site-settings";

function NavigationLink({ link }: { link: SiteLink }) {
  const external = link.openInNewTab || /^https?:\/\//.test(link.url);
  if (external) return <a href={link.url} className="header-link" target="_blank" rel="noopener noreferrer">{link.label}</a>;
  return <Link href={link.url} className="header-link">{link.label}</Link>;
}

export default async function Nav() {
  const settings = await getSiteSettings();
  return (
    <header className="site-nav">
      <Link href="/" className="brand-wordmark" aria-label={`${settings.companyName} home`}>
        {settings.shortName}
      </Link>

      <nav className="header-links" aria-label="Main navigation">
        {visibleLinks(settings.navigationLinks).map((link) => <NavigationLink key={`${link.label}-${link.url}`} link={link} />)}
      </nav>

      <Link href="/contact" className="header-cta">
        Let&apos;s Talk
      </Link>
    </header>
  );
}
