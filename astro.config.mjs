import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://praveenpuglia.com",
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
  integrations: [mdx(), sitemap()],
});
