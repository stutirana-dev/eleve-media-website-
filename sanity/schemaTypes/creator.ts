export const creator = {
  name: "creator",
  title: "Creator",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "profileImage", title: "Profile image", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Gallery images", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "shortBio", title: "Short bio", type: "text", rows: 3 },
    { name: "fullBio", title: "Full bio", type: "text", rows: 8 },
    {
      name: "collection",
      title: "Collection",
      type: "string",
      options: {
        list: [
          { title: "Elevé Partners", value: "eleve-partners" },
          { title: "India & Beyond", value: "india-beyond" },
          { title: "Worldwide Talent", value: "worldwide-talent" },
          { title: "D2C Network", value: "d2c-network" },
          { title: "Selected Collaborations", value: "selected-collaborations" },
        ],
      },
    },
    { name: "niches", title: "Niches", type: "array", of: [{ type: "string" }], options: { list: ["Fashion", "Beauty", "Lifestyle", "Business", "Tech", "Fitness", "Travel", "Entertainment", "Culture", "Other"] } },
    { name: "city", title: "City", type: "string" },
    { name: "region", title: "State / Region", type: "string" },
    { name: "country", title: "Country", type: "string" },
    { name: "latitude", title: "Latitude", type: "number" },
    { name: "longitude", title: "Longitude", type: "number" },
    { name: "instagram", title: "Instagram", type: "url" },
    { name: "youtube", title: "YouTube", type: "url" },
    { name: "otherSocial", title: "Other social", type: "url" },
    { name: "represented", title: "Currently represented", type: "boolean", initialValue: true },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    { name: "active", title: "Active", type: "boolean", initialValue: true },
    { name: "displayOrder", title: "Display order", type: "number", initialValue: 0 },
  ],
};

export default creator;
