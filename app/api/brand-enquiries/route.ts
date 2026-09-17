import { NextResponse } from "next/server";

const requiredFields = [
  "fullName",
  "workEmail",
  "company",
  "market",
  "campaignType",
  "timeline",
  "brief",
] as const;

const urlFields = ["website", "briefUrl"] as const;

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim().slice(0, 5000)
    : "";
}

function validUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Read submitted form
    let incoming: Record<string, unknown>;

    try {
      incoming = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Your brief could not be read. Please try again.",
        },
        { status: 400 }
      );
    }

    // Honeypot anti-spam field
    if (clean(incoming.websiteTrap)) {
      return NextResponse.json(
        {
          error: "Your brief could not be submitted.",
        },
        { status: 400 }
      );
    }

    // Multi-select support areas
    const support = Array.isArray(incoming.support)
      ? incoming.support
          .filter(
            (item): item is string =>
              typeof item === "string"
          )
          .map(clean)
          .filter(Boolean)
          .slice(0, 10)
      : [];

    // Clean normal form fields
    const enquiry: Record<string, string | boolean> = {};

    for (const [key, value] of Object.entries(incoming)) {
      if (
        key === "websiteTrap" ||
        key === "support"
      ) {
        continue;
      }

      if (key === "consent") {
        enquiry.consent = value === true;
      } else {
        enquiry[key] = clean(value);
      }
    }

    // Required field validation
    const missingField = requiredFields.find((field) => {
      const value = enquiry[field];
      return typeof value !== "string" || !value;
    });

    if (
      missingField ||
      enquiry.consent !== true ||
      support.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields, choose at least one support area, and confirm consent.",
        },
        { status: 400 }
      );
    }

    // Email validation
    const workEmail =
      typeof enquiry.workEmail === "string"
        ? enquiry.workEmail
        : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json(
        {
          error: "Please enter a valid work email address.",
        },
        { status: 400 }
      );
    }

    // URL validation
    for (const field of urlFields) {
      const value =
        typeof enquiry[field] === "string"
          ? enquiry[field]
          : "";

      if (!validUrl(value)) {
        return NextResponse.json(
          {
            error:
              "Please check the website and brief URLs.",
          },
          { status: 400 }
        );
      }
    }

    // Sanity configuration
    const projectId =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

    const dataset =
      process.env.NEXT_PUBLIC_SANITY_DATASET ||
      "production";

    const token =
      process.env.SANITY_API_WRITE_TOKEN;

    if (!projectId || !dataset || !token) {
      console.error(
        "Brand enquiry: Sanity environment variables are missing."
      );

      return NextResponse.json(
        {
          error:
            "Brand enquiries are temporarily unavailable. Please try again.",
        },
        { status: 503 }
      );
    }

    const submittedAt = new Date().toISOString();

    // Build Sanity document
    const document = {
      _type: "brandEnquiry",

      fullName:
        typeof enquiry.fullName === "string"
          ? enquiry.fullName
          : "",

      workEmail,

      phone:
        typeof enquiry.phone === "string"
          ? enquiry.phone
          : "",

      company:
        typeof enquiry.company === "string"
          ? enquiry.company
          : "",

      website:
        typeof enquiry.website === "string"
          ? enquiry.website
          : "",

      role:
        typeof enquiry.role === "string"
          ? enquiry.role
          : "",

      market:
        typeof enquiry.market === "string"
          ? enquiry.market
          : "",

      campaignType:
        typeof enquiry.campaignType === "string"
          ? enquiry.campaignType
          : "",

      niche:
        typeof enquiry.niche === "string"
          ? enquiry.niche
          : "",

      preferredLocation:
        typeof enquiry.preferredLocation === "string"
          ? enquiry.preferredLocation
          : "",

      creatorCount:
        typeof enquiry.creatorCount === "string"
          ? enquiry.creatorCount
          : "",

      budget:
        typeof enquiry.budget === "string"
          ? enquiry.budget
          : "",

      timeline:
        typeof enquiry.timeline === "string"
          ? enquiry.timeline
          : "",

      brief:
        typeof enquiry.brief === "string"
          ? enquiry.brief
          : "",

      support,

      briefUrl:
        typeof enquiry.briefUrl === "string"
          ? enquiry.briefUrl
          : "",

      referralSource:
        typeof enquiry.referralSource === "string"
          ? enquiry.referralSource
          : "",

      consent: true,

      submittedAt,

      source: "Elevé Media — For Brands",
    };

    // Save enquiry to Sanity
    const sanityResponse = await fetch(
      `https://${projectId}.api.sanity.io/v2025-01-01/data/mutate/${dataset}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          mutations: [
            {
              create: document,
            },
          ],
        }),

        cache: "no-store",
      }
    );

    // Never show fake success if Sanity did not save it
    if (!sanityResponse.ok) {
      const sanityError = await sanityResponse.text();

      console.error(
        "Brand enquiry Sanity error:",
        sanityResponse.status,
        sanityError
      );

      return NextResponse.json(
        {
          error:
            "Something went wrong while submitting your brief. Please try again.",
        },
        { status: 502 }
      );
    }

    // Success only after Sanity confirms the write
    return NextResponse.json(
      {
        ok: true,
        message: "Brief received successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Brand enquiry unexpected error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while submitting your brief. Please try again.",
      },
      { status: 500 }
    );
  }
}