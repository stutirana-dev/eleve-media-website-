import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CreatorApplicationForm from "@/components/CreatorApplicationForm";

export const metadata: Metadata = {
  title: "For Creators | Elevé Media",
  description: "Creator representation and talent management at Elevé Media. Discover how we work with creators across talent management, brand partnerships, strategy and long-term career growth.",
};

const services = [
  ["01", "TALENT MANAGEMENT", "Day-to-day representation and professional management built around your career."],
  ["02", "BRAND PARTNERSHIPS", "Finding, evaluating and managing partnerships that genuinely fit your audience and identity."],
  ["03", "NEGOTIATIONS", "Commercial conversations, deliverables, timelines and deal terms handled professionally."],
  ["04", "CAMPAIGN MANAGEMENT", "From brief to delivery — keeping communication, execution and expectations organised."],
  ["05", "POSITIONING & STRATEGY", "Helping shape how you present yourself, the opportunities you pursue and where your creator career goes next."],
  ["06", "LONG-TERM GROWTH", "Looking beyond one post or one campaign toward a sustainable creator career."],
];

const qualities = [["VOICE", "A recognisable point of view."], ["CONSISTENCY", "The discipline to keep building."], ["TRUST", "A real relationship with an audience."], ["AMBITION", "A reason to think beyond today."]];
const process = [["01 / APPLY", "Tell us about yourself, your content and where you&apos;re heading."], ["02 / REVIEW", "Our team reviews your profile, content, audience, niche and potential brand fit."], ["03 / CONVERSATION", "If there&apos;s a potential fit, we&apos;ll start a conversation and understand what you&apos;re looking for."], ["04 / REPRESENTATION", "Where both sides align, we&apos;ll establish the appropriate representation structure and begin building together."]];
const faqs = [["Do I need a certain number of followers?", "No fixed audience size guarantees representation. We look at the wider picture — content, audience relationship, consistency, positioning and potential fit."], ["Do I pay to apply?", "No. Applying for consideration should not require an application fee."], ["Does applying guarantee representation?", "No. Applications are reviewed and representation is offered where there is mutual fit."], ["Can I apply from outside India?", "Yes. Elevé is building relationships with talent across markets."], ["What happens after I apply?", "Our team reviews the information provided. If we see potential alignment, we may contact you to continue the conversation."]];

export default function CreatorsPage() {
  return (
    <main className="creators-page">
      <section className="creators-hero creator-editorial-dark">
        <div className="creators-hero-image"><Image src="/images/eleve/eleve-editorial-01.jpg" alt="Editorial creator portrait" fill priority sizes="100vw" /></div>
        <div className="creators-hero-shade" />
        <div className="creators-hero-content"><p className="reference-kicker">For creators / Elevé Media</p><h1 className="reference-title">YOU CREATE.<br /><em>WE ELEVATE.</em></h1><p>Representation built around the person behind the platform.</p><div className="creators-hero-actions"><Link href="#apply" className="reference-button reference-button-light">Apply for representation ↘</Link><Link href="#how-we-work" className="reference-button reference-button-outline">Discover how we work</Link></div></div>
      </section>

      <section className="creator-introduction creator-editorial-light" data-reveal><div className="creator-section-label"><p className="reference-kicker reference-dark-kicker">Representation / 01</p></div><div className="creator-introduction-grid"><div><h2 className="reference-title dark-title">MORE THAN<br />THE NEXT<br /><em>BRAND DEAL.</em></h2><p>Good representation isn&apos;t just about finding another campaign.</p><p>It&apos;s about understanding where you&apos;re going, protecting your value, building the right relationships and making every opportunity fit the bigger picture.</p></div><div className="creator-introduction-image"><Image src="/images/eleve/eleve-editorial-02.jpg" alt="Desaturated editorial creator portrait" fill sizes="(max-width: 800px) 100vw, 45vw" /></div></div></section>

      <section className="creator-services creator-editorial-dark" id="how-we-work"><div className="creator-section-label"><p className="reference-kicker">What we handle</p></div><h2 className="reference-title">WHAT WE<br /><em>HANDLE.</em></h2><div className="creator-service-index">{services.map(([number, title, copy]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p><b>↗</b></article>)}</div></section>

      <section className="creator-model creator-editorial-light" data-reveal><p className="reference-kicker reference-dark-kicker">Aligned from day one / 02</p><h2 className="reference-title dark-title">WE GROW<br />WHEN <em>YOU</em><br />GROW.</h2><p className="creator-model-copy">Our representation model is built around aligned interests.<br /><br />No traditional upfront management fee. When the creator earns through opportunities managed under the applicable representation arrangement, Elevé earns an agreed commission.</p><small>Specific commercial terms depend on the creator&apos;s representation agreement.</small></section>

      <section className="creator-fit creator-editorial-dark"><div className="creator-fit-copy"><p className="reference-kicker">The right fit</p><h2 className="reference-title">WE DON&apos;T<br />LOOK FOR<br /><em>EVERYONE.</em><br /><br />WE LOOK<br />FOR FIT.</h2><p>Audience size matters. But it isn&apos;t the whole story.</p><p>We&apos;re interested in creators with a point of view, consistency, professionalism and the ambition to build something beyond the next post.</p></div><div className="creator-qualities">{qualities.map(([title, copy]) => <article key={title}><span>{title}</span><p>{copy}</p></article>)}</div></section>

      <section className="creator-categories creator-editorial-light"><p className="reference-kicker reference-dark-kicker">The wider network</p><h2 className="reference-title dark-title">WHERE YOU<br /><em>MIGHT FIT.</em></h2><p className="creator-categories-intro">The right structure depends on the creator and the relationship.</p><div className="creator-category-list">{[["ELEVÉ PARTNERS", "Long-term / core representation."], ["INDIA & BEYOND", "India-based creators building wider audiences and opportunities."], ["WORLDWIDE TALENT", "International creators and creative voices."], ["D2C NETWORK", "Flexible / campaign-based creator opportunities."]].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><b>↗</b></article>)}</div></section>

      <section className="creator-process creator-editorial-dark"><p className="reference-kicker">The beginning / 03</p><h2 className="reference-title">FROM<br /><em>HELLO</em><br />TO ELEVÉ.</h2><div className="creator-process-list">{process.map(([title, copy]) => <article key={title}><span>{title}</span><p dangerouslySetInnerHTML={{ __html: copy }} /></article>)}</div></section>

      <section className="creator-photo-break"><Image src="/images/eleve/eleve-editorial-03.jpg" alt="Cinematic editorial creator image" fill sizes="100vw" /><div><p className="reference-kicker">The next chapter</p><h2 className="reference-title">YOUR PLATFORM<br />IS ONLY THE<br /><em>BEGINNING.</em></h2></div></section>

      <section id="apply" className="creator-application creator-editorial-light"><div className="creator-application-heading"><p className="reference-kicker reference-dark-kicker">Make an introduction</p><h2 className="reference-title dark-title"><span>READY</span><span>TO BE</span><span className="application-heading-long-line">REPRESENTED?</span></h2><p>Start with an introduction.</p></div><CreatorApplicationForm /></section>

      <section className="creator-faq creator-editorial-dark"><p className="reference-kicker">Questions</p><h2 className="reference-title">GOOD TO<br /><em>KNOW.</em></h2><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="creator-final creator-editorial-dark"><Image src="/images/eleve/eleve-editorial-01.jpg" alt="Editorial creator portrait" fill sizes="100vw" /><div className="creator-final-shade" /><div><p className="reference-kicker">Start here</p><h2 className="reference-title">LET&apos;S BUILD<br /><em>WHAT COMES NEXT.</em></h2><Link href="#apply" className="reference-button reference-button-light">Apply for representation →</Link><Link href="/talent" className="creator-final-link">Explore our talent ↗</Link></div></section>
    </main>
  );
}
