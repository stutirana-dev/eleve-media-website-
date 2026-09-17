import type { Metadata } from "next";
import Link from "next/link";
import ContactOptions from "@/components/ContactOptions";

export const metadata: Metadata = { title: "Contact | Elevé Media", description: "Start a conversation with Elevé Media about creator representation, brand partnerships, campaigns and creative production." };

export default function ContactPage() {
  return <main className="contact-page">
    <section className="contact-hero contact-light"><p className="reference-kicker reference-dark-kicker">Contact / Elevé Media</p><h1 className="reference-title dark-title">LET&apos;S<br /><em>TALK.</em></h1><p>Creators, brands, partnerships or something entirely new — start the conversation here.</p></section>
    <ContactOptions />
    <section className="contact-details contact-dark"><p className="reference-kicker">Other ways to reach us.</p><h2 className="reference-title">START<br /><em>SOMEWHERE.</em></h2><div><a href="mailto:helloelevemedia.in@gmail.com"><span>Email</span><strong>helloelevemedia.in@gmail.com</strong><b>↗</b></a><div><span>Location / Presence</span><strong>India / Worldwide</strong></div></div></section>
    <section className="contact-routing contact-light"><p className="reference-kicker reference-dark-kicker">Different conversations</p><div><article><span>Are you a creator?</span><p>Looking for representation?</p><Link href="/creators">For creators →</Link></article><article><span>Are you a brand?</span><p>Looking for talent or a campaign partner?</p><Link href="/brands">For brands →</Link></article><article><span>Looking for creative production?</span><p>Ideas, made visible.</p><Link href="/studio">Studio →</Link></article></div></section>
    <section className="contact-final contact-dark"><p className="reference-kicker">The beginning</p><h2 className="reference-title">GOOD<br />CONVERSATIONS<br /><em>START SOMEWHERE.</em></h2></section>
  </main>;
}
