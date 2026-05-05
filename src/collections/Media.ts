import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 480, height: 270, position: "centre" },
      { name: "card", width: 1200, height: 800, position: "centre" },
      { name: "banner", width: 2400 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text (for accessibility)",
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
