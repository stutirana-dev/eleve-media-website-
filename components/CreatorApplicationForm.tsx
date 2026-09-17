"use client";

import { FormEvent, useState } from "react";

const initialState = {
  fullName: "", email: "", phone: "", city: "", country: "", primaryPlatform: "", primaryProfileUrl: "", additionalProfileUrl: "", primaryNiche: "", audienceSize: "", contentSummary: "", representationGoals: "", workedWithBrands: "", representationStatus: "", portfolioUrl: "", referralSource: "", consent: false,
};

type FormState = typeof initialState;

const fields = [
  ["fullName", "Full name", "text", true], ["email", "Email", "email", true], ["phone", "Phone / WhatsApp", "tel", false], ["city", "City", "text", true], ["country", "Country", "text", true],
] as const;

export default function CreatorApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update(name: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/creator-applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, website }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus("success");
      setForm(initialState);
      setWebsite("");
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  if (status === "success") return <div className="application-success"><p className="reference-kicker reference-dark-kicker">Application received.</p><h3>Thanks for introducing yourself.</h3><p>If there&apos;s a potential fit, our team will be in touch.</p></div>;

  return (
    <form className="creator-application-form" onSubmit={submit} noValidate>
      <label className="application-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      <div className="application-field-grid">
        {fields.map(([name, label, type, required]) => <label key={name}>{label} {required && <span>*</span>}<input required={required} type={type} value={form[name]} onChange={(event) => update(name, event.target.value)} /></label>)}
      </div>
      <div className="application-field-grid">
        <label>Primary platform *<select required value={form.primaryPlatform} onChange={(event) => update("primaryPlatform", event.target.value)}><option value="">Select platform</option>{["Instagram", "YouTube", "TikTok", "LinkedIn", "Other"].map((option) => <option key={option}>{option}</option>)}</select></label>
        <label>Primary profile URL *<input required type="url" value={form.primaryProfileUrl} onChange={(event) => update("primaryProfileUrl", event.target.value)} /></label>
        <label>Additional profile URL<input type="url" value={form.additionalProfileUrl} onChange={(event) => update("additionalProfileUrl", event.target.value)} /></label>
        <label>Primary niche *<select required value={form.primaryNiche} onChange={(event) => update("primaryNiche", event.target.value)}><option value="">Select niche</option>{["Fashion", "Beauty", "Lifestyle", "Business", "Tech", "Fitness", "Travel", "Entertainment", "Culture", "Other"].map((option) => <option key={option}>{option}</option>)}</select></label>
      </div>
      <label>Approximate audience size <span className="optional">Optional</span><input value={form.audienceSize} onChange={(event) => update("audienceSize", event.target.value)} /></label>
      <label>Tell us about your content *<textarea required rows={5} value={form.contentSummary} onChange={(event) => update("contentSummary", event.target.value)} /></label>
      <label>What are you looking for from representation? *<textarea required rows={5} value={form.representationGoals} onChange={(event) => update("representationGoals", event.target.value)} /></label>
      <div className="application-field-grid">
        <label>Have you worked with brands before?<select value={form.workedWithBrands} onChange={(event) => update("workedWithBrands", event.target.value)}><option value="">Select one</option><option>Yes</option><option>No</option></select></label>
        <label>Current representation status<select value={form.representationStatus} onChange={(event) => update("representationStatus", event.target.value)}><option value="">Select one</option><option>Not represented</option><option>Currently represented</option><option>Previously represented</option><option>Prefer not to say</option></select></label>
        <label>Portfolio / Media Kit URL <span className="optional">Optional</span><input type="url" value={form.portfolioUrl} onChange={(event) => update("portfolioUrl", event.target.value)} /></label>
        <label>How did you hear about Elevé? <span className="optional">Optional</span><input value={form.referralSource} onChange={(event) => update("referralSource", event.target.value)} /></label>
      </div>
      <label className="consent-field"><input required type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} /><span>I confirm that the information provided is accurate and I agree to be contacted by Elevé Media regarding my application.</span></label>
      {status === "error" && <p className="application-error" role="alert">{error}</p>}
      <button className="reference-button reference-button-dark" disabled={status === "loading"} type="submit">{status === "loading" ? "Sending..." : "Apply to Elevé →"}</button>
    </form>
  );
}
