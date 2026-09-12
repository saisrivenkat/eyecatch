import type { CollectionConfig } from "payload";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "size", "publishedAt", "updatedAt"],
    description:
      "Case studies shown on the home work grid and on /work/[slug] detail pages.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: {
      autosave: { interval: 800 },
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && data.title && !data.slug) {
          data.slug = slugify(data.title);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              admin: {
                description:
                  "URL segment under /work/. Leave blank to auto-fill from title.",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "category",
                  type: "select",
                  required: true,
                  defaultValue: "Branding",
                  admin: { width: "50%" },
                  options: [
                    { label: "Branding", value: "Branding" },
                    { label: "Logo", value: "Logo" },
                    { label: "Web", value: "Web" },
                    { label: "Packaging", value: "Packaging" },
                    { label: "Campaign", value: "Campaign" },
                    { label: "Motion", value: "Motion" },
                    { label: "Print", value: "Print" },
                  ],
                },
                {
                  name: "size",
                  type: "select",
                  required: true,
                  defaultValue: "small",
                  admin: {
                    width: "50%",
                    description:
                      "Card size in the work grid. Large = full-width row, small = half-width.",
                  },
                  options: [
                    { label: "Large", value: "large" },
                    { label: "Small", value: "small" },
                  ],
                },
              ],
            },
            {
              name: "services",
              type: "array",
              labels: { singular: "Service", plural: "Services" },
              fields: [
                {
                  name: "value",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              admin: {
                description: "Short blurb shown on the work grid card.",
              },
            },
            {
              name: "fullDescription",
              type: "textarea",
              admin: {
                description:
                  "Long-form story shown on the project detail page.",
              },
            },
          ],
        },
        {
          label: "Media",
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { description: "Used as the work-grid card image." },
            },
            {
              name: "bannerImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Wide hero/banner image rendered near the bottom of the case study.",
              },
            },
            {
              name: "video",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Optional auto-playing reel near the top of the case study.",
              },
            },
            {
              name: "videoPoster",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Poster frame shown before the video starts loading.",
              },
            },
            {
              name: "photos",
              type: "array",
              labels: { singular: "Photo", plural: "Photos" },
              admin: {
                description:
                  "Additional gallery photos. (Rendered in order — first one shown first.)",
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                { name: "caption", type: "text" },
              ],
            },
          ],
        },
        {
          label: "SEO & meta",
          fields: [
            {
              name: "publishedAt",
              type: "date",
              admin: {
                position: "sidebar",
                description: "Used for ordering on the work grid.",
                date: { pickerAppearance: "dayAndTime" },
              },
            },
            { name: "metaTitle", type: "text" },
            { name: "metaDescription", type: "textarea" },
          ],
        },
      ],
    },
  ],
};
