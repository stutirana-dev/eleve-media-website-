export const creatorApplication = {
  name: "creatorApplication",
  title: "Creator Application",
  type: "document",
  fields: [
    { name: "fullName", title: "Full name", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "email", title: "Email", type: "email", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "phone", title: "Phone / WhatsApp", type: "string" },
    { name: "city", title: "City", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "country", title: "Country", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "primaryPlatform", title: "Primary platform", type: "string", options: { list: ["Instagram", "YouTube", "TikTok", "LinkedIn", "Other"] }, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "primaryProfileUrl", title: "Primary profile URL", type: "url", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "additionalProfileUrl", title: "Additional profile URL", type: "url" },
    { name: "primaryNiche", title: "Primary niche", type: "string", options: { list: ["Fashion", "Beauty", "Lifestyle", "Business", "Tech", "Fitness", "Travel", "Entertainment", "Culture", "Other"] }, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "audienceSize", title: "Approximate audience size", type: "string" },
    { name: "contentSummary", title: "Tell us about your content", type: "text", rows: 5, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "representationGoals", title: "What are you looking for from representation?", type: "text", rows: 5, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "workedWithBrands", title: "Have you worked with brands before?", type: "string", options: { list: ["Yes", "No"] } },
    { name: "representationStatus", title: "Current representation status", type: "string", options: { list: ["Not represented", "Currently represented", "Previously represented", "Prefer not to say"] } },
    { name: "portfolioUrl", title: "Portfolio / Media Kit URL", type: "url" },
    { name: "referralSource", title: "How did you hear about Elevé?", type: "string" },
    { name: "consent", title: "Consent", type: "boolean", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "submittedAt", title: "Submitted at", type: "datetime" },
  ],
};

export default creatorApplication;
