import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "string" }),
    defineField({ name: "body", title: "Body Text", type: "text" }),
    defineField({ name: "image", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "icon", title: "Icon Name (tattoo/piercing/makeup)", type: "string" }),
    defineField({
      name: "features",
      title: "Feature Cards",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
          defineField({ name: "icon", title: "Icon Name", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "galleryBand",
      title: "Gallery Band Images (horizontal strip)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
