"use client";

import { FormEvent, useEffect, useState } from "react";

type Mode = "callback" | "meeting" | null;

const initialCallback = { fullName: "", phone: "", email: "", reachingOutAs: "", bestTime: "", discussion: "", consent: false };
const initialMeeting = { fullName: "", workEmail: "", phone: "", company: "", reachingOutAs: "", meetingAbout: "", preferredDate: "", preferredTime: "", timezone: "", format: "", context: "" };
const audiences = ["Creator", "Brand", "Agency", "Business", "Other"];

export default function ContactOptions() {
  const [mode, setMode] = useState<Mode>(null);
  const [callback, setCallback] = useState(initialCallback);
  const [meeting, setMeeting] = useState(initialMeeting);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mode) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMode(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [mode]);

  const open = (nextMode: Exclude<Mode, null>) => { setError(""); setStatus("idle"); setMode(nextMode); };
  const updateCallback = (name: keyof typeof initialCallback, value: string | boolean) => setCallback((current) => ({ ...current, [name]: value }));
  const updateMeeting = (name: keyof typeof initialMeeting, value: string) => setMeeting((current) => ({ ...current, [name]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const payload = mode === "callback" ? { type: "callback", ...callback } : { type: "meeting", ...meeting };
    try {
      const response = await fetch("/api/contact-requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setMode(null);
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  return <>
    <section className="contact-options" aria-label="Contact options">
      <a className="contact-option" href="mailto:helloelevemedia.in@gmail.com"><span>01</span><div><h2>EMAIL US</h2><p>For general enquiries, introductions and conversations.</p><strong>helloelevemedia.in@gmail.com</strong></div><b>SEND AN EMAIL ↗</b></a>
      <button className="contact-option" type="button" onClick={() => open("callback")}><span>02</span><div><h2>REQUEST A CALLBACK</h2><p>Prefer talking directly? Leave your details and tell us briefly what you&apos;d like to discuss.</p></div><b>REQUEST A CALL →</b></button>
      <button className="contact-option" type="button" onClick={() => open("meeting")}><span>03</span><div><h2>SET UP A MEETING</h2><p>For partnerships, campaigns, representation or a more detailed conversation.</p></div><b>REQUEST A MEETING →</b></button>
    </section>

    {mode && <div className="contact-drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setMode(null)}><aside className="contact-drawer" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title"><button className="contact-close" type="button" onClick={() => setMode(null)} aria-label="Close contact form">×</button><p className="reference-kicker reference-dark-kicker">{mode === "callback" ? "Direct conversation" : "Meeting request"}</p><h2 id="contact-dialog-title" className="reference-title dark-title">{mode === "callback" ? <>REQUEST<br /><em>A CALL.</em></> : <>SET UP<br /><em>A MEETING.</em></>}</h2><p className="contact-drawer-note">{mode === "callback" ? "Tell us how to reach you. This is a request, not a confirmed appointment." : "Share a preferred time and context. We&apos;ll review the request before confirming anything."}</p>
      <form className="contact-request-form" onSubmit={submit}>
        {mode === "callback" ? <><label>Full name *<input required value={callback.fullName} onChange={(event) => updateCallback("fullName", event.target.value)} /></label><label>Phone / WhatsApp *<input required type="tel" value={callback.phone} onChange={(event) => updateCallback("phone", event.target.value)} /></label><label>Email<input type="email" value={callback.email} onChange={(event) => updateCallback("email", event.target.value)} /></label><label>I&apos;m reaching out as *<select required value={callback.reachingOutAs} onChange={(event) => updateCallback("reachingOutAs", event.target.value)}><option value="">Select one</option>{audiences.map((item) => <option key={item}>{item}</option>)}</select></label><label>Best time to call *<select required value={callback.bestTime} onChange={(event) => updateCallback("bestTime", event.target.value)}><option value="">Select one</option>{["Morning", "Afternoon", "Evening", "No Preference"].map((item) => <option key={item}>{item}</option>)}</select></label><label>What would you like to discuss?<textarea rows={4} value={callback.discussion} onChange={(event) => updateCallback("discussion", event.target.value)} /></label><label className="contact-consent"><input required type="checkbox" checked={callback.consent} onChange={(event) => updateCallback("consent", event.target.checked)} /><span>I agree to be contacted by Elevé Media regarding this enquiry.</span></label></> : <><label>Full name *<input required value={meeting.fullName} onChange={(event) => updateMeeting("fullName", event.target.value)} /></label><label>Work email *<input required type="email" value={meeting.workEmail} onChange={(event) => updateMeeting("workEmail", event.target.value)} /></label><label>Phone / WhatsApp<input type="tel" value={meeting.phone} onChange={(event) => updateMeeting("phone", event.target.value)} /></label><label>Company / Creator name<input value={meeting.company} onChange={(event) => updateMeeting("company", event.target.value)} /></label><label>I&apos;m reaching out as *<select required value={meeting.reachingOutAs} onChange={(event) => updateMeeting("reachingOutAs", event.target.value)}><option value="">Select one</option>{audiences.map((item) => <option key={item}>{item}</option>)}</select></label><label>Meeting about *<select required value={meeting.meetingAbout} onChange={(event) => updateMeeting("meetingAbout", event.target.value)}><option value="">Select one</option>{["Creator Representation", "Brand Partnership", "Campaign", "Studio / Production", "Business Partnership", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Preferred date *<input required type="date" value={meeting.preferredDate} onChange={(event) => updateMeeting("preferredDate", event.target.value)} /></label><label>Preferred time *<input required type="time" value={meeting.preferredTime} onChange={(event) => updateMeeting("preferredTime", event.target.value)} /></label><label>Timezone *<input required value={meeting.timezone} onChange={(event) => updateMeeting("timezone", event.target.value)} /></label><label>Meeting format *<select required value={meeting.format} onChange={(event) => updateMeeting("format", event.target.value)}><option value="">Select one</option><option>Google Meet</option><option>Phone Call</option><option>Other</option></select></label><label>Message / Context<textarea rows={4} value={meeting.context} onChange={(event) => updateMeeting("context", event.target.value)} /></label></>}
        {status === "error" && <p className="contact-form-error" role="alert">{error}</p>}<button className="reference-button reference-button-dark" type="submit" disabled={status === "loading"}>{status === "loading" ? "Submitting..." : mode === "callback" ? "Request callback →" : "Request meeting →"}</button>
      </form></aside></div>}
  </>;
}
