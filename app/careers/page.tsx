import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at Elevé Media and work with a global talent management and creator representation agency.",
};

export default function CareersPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#f4f1eb",
        padding: "180px 7vw 120px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "30px",
          opacity: 0.7,
        }}
      >
        Careers / Elevé Media
      </p>

      <h1
        style={{
          fontSize: "clamp(54px, 9vw, 130px)",
          lineHeight: 0.9,
          fontWeight: 500,
          letterSpacing: "-0.05em",
          maxWidth: "1100px",
          margin: 0,
        }}
      >
        WORK BEHIND
        <br />
        THE TALENT.
      </h1>

      <div
        style={{
          marginTop: "80px",
          paddingTop: "40px",
          borderTop: "1px solid rgba(255,255,255,.25)",
          maxWidth: "760px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(25px, 3vw, 42px)",
            fontWeight: 400,
            marginBottom: "25px",
          }}
        >
          Build what comes next with us.
        </h2>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            opacity: 0.72,
          }}
        >
          Elevé Media works at the intersection of talent, culture, brands and
          creativity. We&apos;re always interested in meeting people who understand
          creators, move with culture and care about doing exceptional work.
        </p>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            opacity: 0.72,
            marginTop: "20px",
          }}
        >
          There are currently no publicly listed openings. If you believe you
          could bring something valuable to Elevé, you can still introduce
          yourself to our team.
        </p>

        <a
          href="/contact"
          style={{
            display: "inline-block",
            marginTop: "45px",
            paddingBottom: "8px",
            borderBottom: "1px solid currentColor",
            color: "inherit",
            textDecoration: "none",
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Introduce Yourself →
        </a>
      </div>
    </main>
  );
}