export const brandEnquiry = {
  name: "brandEnquiry",
  title: "Brand Enquiry",
  type: "document",
  fields: [
    { name: "fullName", title: "Full name", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "workEmail", title: "Work email", type: "email", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "phone", title: "Phone / WhatsApp", type: "string" },
    { name: "company", title: "Company / Brand name", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "website", title: "Website / Brand URL", type: "url" },
    { name: "role", title: "Your role", type: "string" },
    { name: "market", title: "Campaign market / Location", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "campaignType", title: "Campaign type", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "niche", title: "Creator category / Niche", type: "string" },
    { name: "preferredLocation", title: "Preferred creator location", type: "string" },
    { name: "creatorCount", title: "Number of creators", type: "string" },
    { name: "budget", title: "Approximate budget range", type: "string" },
    { name: "timeline", title: "Campaign timeline", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "brief", title: "Campaign / brief", type: "text", rows: 6, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "support", title: "What should Elevé handle?", type: "array", of: [{ type: "string" }] },
    { name: "briefUrl", title: "Portfolio / Brief URL", type: "url" },
    { name: "referralSource", title: "How did you hear about Elevé?", type: "string" },
    { name: "consent", title: "Consent", type: "boolean", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "submittedAt", title: "Submitted at", type: "datetime" },
  ],
};

export default brandEnquiry;
