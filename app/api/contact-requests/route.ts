import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const recipient = "helloelevemedia.in@gmail.com";
const labels: Record<string, string> = { fullName: "Full name", phone: "Phone / WhatsApp", email: "Email", workEmail: "Work email", reachingOutAs: "Reaching out as", bestTime: "Best time to call", discussion: "Discussion", company: "Company / Creator name", meetingAbout: "Meeting about", preferredDate: "Preferred date", preferredTime: "Preferred time", timezone: "Timezone", format: "Meeting format", context: "Message / Context" };
function clean(value: unknown) { return typeof value === "string" ? value.trim().slice(0, 5000) : ""; }
function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character); }

export async function POST(request: Request) {
  let incoming: Record<string, unknown>;
  try { incoming = await request.json(); } catch { return NextResponse.json({ error: "Please send a valid request." }, { status: 400 }); }
  const type = incoming.type === "callback" || incoming.type === "meeting" ? incoming.type : null;
  const fields = Object.fromEntries(Object.entries(incoming).filter(([key]) => key !== "type" && key !== "consent").map(([key, value]) => [key, clean(value)])) as Record<string, string>;
  const required = type === "callback" ? ["fullName", "phone", "reachingOutAs", "bestTime"] : ["fullName", "workEmail", "reachingOutAs", "meetingAbout", "preferredDate", "preferredTime", "timezone", "format"];
  if (!type || required.some((field) => !fields[field]) || (type === "callback" && incoming.consent !== true)) return NextResponse.json({ error: "Please complete the required fields and consent." }, { status: 400 });
  if (fields.email && !/^\S+@\S+\.\S+$/.test(fields.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (fields.workEmail && !/^\S+@\S+\.\S+$/.test(fields.workEmail)) return NextResponse.json({ error: "Please enter a valid work email address." }, { status: 400 });

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const fromAddress = process.env.APPLICATION_FROM_EMAIL || smtpUser;
  if (!smtpHost || !smtpUser || !smtpPassword || !fromAddress) return NextResponse.json({ error: "This request form is not connected yet. Please email helloelevemedia.in@gmail.com directly." }, { status: 503 });

  const submittedAt = new Date().toISOString();
  const rows = Object.entries(fields).map(([key, value]) => `<tr><td style="padding:8px 18px 8px 0;color:#777;vertical-align:top">${labels[key] || key}</td><td style="padding:8px 0">${escapeHtml(value) || "—"}</td></tr>`).join("");
  const title = type === "callback" ? "CALLBACK REQUEST" : "MEETING REQUEST";
  const replyTo = fields.email || fields.workEmail;
  const transporter = nodemailer.createTransport({ host: smtpHost, port: smtpPort, secure: smtpPort === 465, auth: { user: smtpUser, pass: smtpPassword } });
  try { await transporter.sendMail({ from: fromAddress, to: recipient, replyTo: replyTo || undefined, subject: `NEW ${title} — ${fields.fullName}`, text: `New ${title.toLowerCase()} from ${fields.fullName}\n\n${Object.entries(fields).map(([key, value]) => `${labels[key] || key}: ${value}`).join("\n")}\n\nSubmitted: ${submittedAt}`, html: `<div style="max-width:680px;margin:0 auto;color:#171717"><p style="font:600 12px Arial,sans-serif;letter-spacing:.14em">ELEVÉ MEDIA</p><h1 style="font:400 34px Georgia,serif">${title}</h1><table style="border-collapse:collapse;font:15px/1.5 Arial,sans-serif">${rows}</table><p style="margin-top:24px;color:#777">Submitted: ${submittedAt}</p></div>` }); } catch { return NextResponse.json({ error: "Something went wrong while sending your request. Please try again." }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
