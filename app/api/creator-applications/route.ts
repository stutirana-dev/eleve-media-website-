import { NextResponse } from "next/server";

const requiredFields = [
  "fullName",
  "email",
  "city",
  "country",
  "primaryPlatform",
  "primaryProfileUrl",
  "primaryNiche",
  "contentSummary",
  "representationGoals",
] as const;

const urlFields = [
  "primaryProfileUrl",
  "additionalProfileUrl",
  "portfolioUrl",
] as const;

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim().slice(0, 5000)
    : "";
}

function validateUrl(value: string) {
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
    // Read submitted form data
    let incoming: Record<string, unknown>;

    try {
      incoming = await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            "Your application could not be read. Please try again.",
        },
        { status: 400 }
      );
    }

    // Honeypot anti-spam field
    if (clean(incoming.website)) {
      return NextResponse.json(
        {
          error: "Your application could not be submitted.",
        },
        { status: 400 }
      );
    }

    // Clean submitted values
    const application: Record<string, string | boolean> = {};

    for (const [key, value] of Object.entries(incoming)) {
      if (key === "website") continue;

      if (key === "consent") {
        application.consent = value === true;
      } else {
        application[key] = clean(value);
      }
    }

    // Required fields
    const missingField = requiredFields.find((field) => {
      const value = application[field];
      return typeof value !== "string" || !value;
    });

    if (missingField || application.consent !== true) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields and confirm consent.",
        },
        { status: 400 }
      );
    }

    // Email validation
    const email =
      typeof application.email === "string"
        ? application.email
        : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // URL validation
    for (const field of urlFields) {
      const value =
        typeof application[field] === "string"
          ? application[field]
          : "";

      if (!validateUrl(value)) {
        return NextResponse.json(
          {
            error:
              "Please check the profile and portfolio URLs.",
          },
          { status: 400 }
        );
      }
    }

    // Sanity credentials — server side only
    const projectId =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

    const dataset =
      process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

    const token =
      process.env.SANITY_API_WRITE_TOKEN;

    if (!projectId || !dataset || !token) {
      console.error(
        "Creator application: Sanity environment variables are missing."
      );

      return NextResponse.json(
        {
          error:
            "Applications are temporarily unavailable. Please try again.",
        },
        { status: 503 }
      );
    }

    const submittedAt = new Date().toISOString();

    // Document that will appear automatically
    // inside Sanity → Creator Application
    const document = {
      _type: "creatorApplication",

      fullName:
        typeof application.fullName === "string"
          ? application.fullName
          : "",

      email,

      phone:
        typeof application.phone === "string"
          ? application.phone
          : "",

      city:
        typeof application.city === "string"
          ? application.city
          : "",

      country:
        typeof application.country === "string"
          ? application.country
          : "",

      primaryPlatform:
        typeof application.primaryPlatform === "string"
          ? application.primaryPlatform
          : "",

      primaryProfileUrl:
        typeof application.primaryProfileUrl === "string"
          ? application.primaryProfileUrl
          : "",

      additionalProfileUrl:
        typeof application.additionalProfileUrl === "string"
          ? application.additionalProfileUrl
          : "",

      primaryNiche:
        typeof application.primaryNiche === "string"
          ? application.primaryNiche
          : "",

      audienceSize:
        typeof application.audienceSize === "string"
          ? application.audienceSize
          : "",

      contentSummary:
        typeof application.contentSummary === "string"
          ? application.contentSummary
          : "",

      representationGoals:
        typeof application.representationGoals === "string"
          ? application.representationGoals
          : "",

      workedWithBrands:
        typeof application.workedWithBrands === "string"
          ? application.workedWithBrands
          : "",

      representationStatus:
        typeof application.representationStatus === "string"
          ? application.representationStatus
          : "",

      portfolioUrl:
        typeof application.portfolioUrl === "string"
          ? application.portfolioUrl
          : "",

      referralSource:
        typeof application.referralSource === "string"
          ? application.referralSource
          : "",

      consent: true,

      submittedAt,

      source: "Elevé Media — For Creators",
    };

    // Save application to Sanity
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

    if (!sanityResponse.ok) {
      const sanityError = await sanityResponse.text();

      console.error(
        "Creator application Sanity error:",
        sanityResponse.status,
        sanityError
      );

      return NextResponse.json(
        {
          error:
            "Something went wrong while submitting your application. Please try again.",
        },
        { status: 502 }
      );
    }

    // Success is returned ONLY after Sanity confirms the write
    return NextResponse.json(
      {
        ok: true,
        message:
          "Application received successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Creator application unexpected error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while submitting your application. Please try again.",
      },
      { status: 500 }
    );
  }
}