import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import cacheBuster from "@mightyplow/eleventy-plugin-cache-buster";
import pluginCSS from "eleventy-postcss-extension";
import { DateTime } from "luxon";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPassthroughCopy({
    "./static": ".",
  });
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginCSS);
  eleventyConfig.addPlugin(cacheBuster({}));

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL, yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    );
  }

  eleventyConfig.addFilter("filterTagList", filterTagList);

  /**
   * Create custom data collections
   * for blog and feed
   * Code from https://github.com/hankchizljaw/hylia
   */
  // Blog posts collection
  const now = new Date();
  const livePosts = (post) => post.date <= now && !post.data.draft;
  eleventyConfig.addCollection("posts", (collection) => {
    return [
      ...collection.getFilteredByGlob(`./src/posts/*.md`).filter(livePosts),
    ];
  });

  return {
    dir: {
      input: "src",
    },
    passthroughFileCopy: true,
  };
};
