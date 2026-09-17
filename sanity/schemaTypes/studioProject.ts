export const studioProject = {
  name: "studioProject",
  title: "Studio Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "projectType", title: "Project type", type: "string" },
    { name: "year", title: "Year", type: "string" },
    { name: "client", title: "Client / Brand", type: "string" },
    { name: "creator", title: "Creator / Talent", type: "string" },
    { name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } },
    { name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "video", title: "Hero video", type: "url" },
    { name: "description", title: "Short introduction", type: "text", rows: 4 },
    { name: "brief", title: "Brief", type: "text", rows: 6 },
    { name: "creativeApproach", title: "Creative approach", type: "text", rows: 6 },
    { name: "services", title: "Services", type: "array", of: [{ type: "string" }] },
    { name: "deliverables", title: "Deliverables", type: "array", of: [{ type: "string" }] },
    { name: "credits", title: "Credits", type: "array", of: [{ type: "string" }] },
    { name: "results", title: "Results", type: "text", rows: 4 },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    { name: "published", title: "Published", type: "boolean", initialValue: false },
    { name: "displayOrder", title: "Display order", type: "number", initialValue: 0 },
  ],
};

export default studioProject;
