import { defineType, defineField } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Reviewer Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "initials", title: "Initials (e.g. PH)", type: "string" }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "date", title: "Review Date", type: "date" }),
    defineField({ name: "text", title: "Review Text", type: "text" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "text" },
  },
});
