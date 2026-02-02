import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Date",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        socialImage: fields.text({
          label: "Social Image Path",
          description: "Path to the social image (e.g., /assets/images/2025/image.avif)",
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: true,
        }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/assets/images/posts",
              publicPath: "/assets/images/posts/",
              transformFilename: (originalFilename) => {
                const ext = originalFilename.split(".").pop();
                const timestamp = Date.now();
                const random = Math.random().toString(36).substring(2, 8);
                return `${timestamp}-${random}.${ext}`;
              },
            },
          },
        }),
      },
    }),
  },
});
