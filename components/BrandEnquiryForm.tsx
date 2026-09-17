"use client";

import { FormEvent, useState } from "react";

const initialState = { fullName: "", workEmail: "", phone: "", company: "", website: "", role: "", market: "", campaignType: "", niche: "", preferredLocation: "", creatorCount: "", budget: "", timeline: "", brief: "", support: [] as string[], briefUrl: "", referralSource: "", consent: false };
const campaignTypes = ["Brand Awareness", "Product Launch", "Creator Collaboration", "UGC", "Social Campaign", "Event / Activation", "Long-term Partnership", "Other"];
const niches = ["Fashion", "Beauty", "Lifestyle", "Business", "Tech", "Fitness", "Travel", "Entertainment", "Culture", "Other"];
const supportOptions = ["Talent Discovery", "Creator Shortlisting", "Negotiation", "Campaign Management", "Creative Coordination", "Full Campaign Support", "Not Sure Yet"];

export default function BrandEnquiryForm() {
  const [form, setForm] = useState(initialState);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const update = (name: keyof typeof initialState, value: string | boolean | string[]) => setForm((current) => ({ ...current, [name]: value }));
  const toggleSupport = (value: string) => update("support", form.support.includes(value) ? form.support.filter((item) => item !== value) : [...form.support, value]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/brand-enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, websiteTrap: honeypot }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus("success");
      setForm(initialState);
      setHoneypot("");
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  if (status === "success") return <div className="brand-form-success"><p className="reference-kicker reference-dark-kicker">Brief received.</p><h3>Thanks for reaching out.</h3><p>Our team will review the details and continue the conversation where appropriate.</p></div>;

  return <form className="brand-enquiry-form" onSubmit={submit} noValidate>
    <label className="brand-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} /></label>
    <div className="brand-form-grid">
      <label>Full name *<input required value={form.fullName} onChange={(event) => update("fullName", event.target.value)} /></label>
      <label>Work email *<input required type="email" value={form.workEmail} onChange={(event) => update("workEmail", event.target.value)} /></label>
      <label>Phone / WhatsApp<input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} /></label>
      <label>Company / Brand name *<input required value={form.company} onChange={(event) => update("company", event.target.value)} /></label>
      <label>Website / Brand URL<input type="url" value={form.website} onChange={(event) => update("website", event.target.value)} /></label>
      <label>Your role<input value={form.role} onChange={(event) => update("role", event.target.value)} /></label>
      <label>Campaign market / Location *<input required value={form.market} onChange={(event) => update("market", event.target.value)} /></label>
      <label>Campaign type *<select required value={form.campaignType} onChange={(event) => update("campaignType", event.target.value)}><option value="">Select campaign type</option>{campaignTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Creator category / Niche<select value={form.niche} onChange={(event) => update("niche", event.target.value)}><option value="">Select category</option>{niches.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Preferred creator location<input value={form.preferredLocation} onChange={(event) => update("preferredLocation", event.target.value)} /></label>
      <label>Number of creators <span className="optional">Optional</span><input value={form.creatorCount} onChange={(event) => update("creatorCount", event.target.value)} /></label>
      <label>Approximate budget range <span className="optional">Optional</span><input value={form.budget} onChange={(event) => update("budget", event.target.value)} /></label>
      <label>Campaign timeline *<input required value={form.timeline} onChange={(event) => update("timeline", event.target.value)} /></label>
    </div>
    <label>Tell us about the campaign / brief *<textarea required rows={6} value={form.brief} onChange={(event) => update("brief", event.target.value)} /></label>
    <fieldset><legend>What would you like Elevé to handle? *</legend><div className="brand-support-grid">{supportOptions.map((item) => <label key={item}><input type="checkbox" checked={form.support.includes(item)} onChange={() => toggleSupport(item)} />{item}</label>)}</div></fieldset>
    <div className="brand-form-grid"><label>Portfolio / Brief URL <span className="optional">Optional</span><input type="url" value={form.briefUrl} onChange={(event) => update("briefUrl", event.target.value)} /></label><label>How did you hear about Elevé? <span className="optional">Optional</span><input value={form.referralSource} onChange={(event) => update("referralSource", event.target.value)} /></label></div>
    <label className="brand-consent"><input required type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} /><span>I confirm that the information provided is accurate and I agree to be contacted by Elevé Media regarding this enquiry.</span></label>
    {status === "error" && <p className="brand-form-error" role="alert">{error}</p>}
    <button className="reference-button reference-button-dark" disabled={status === "loading"} type="submit">{status === "loading" ? "Sending..." : "Send the brief →"}</button>
  </form>;
}
