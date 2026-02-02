import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

export default defineConfig({
  site: "https://praveenpuglia.com",
  integrations: [mdx(), sitemap(), react(), keystatic()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
});
