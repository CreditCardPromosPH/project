import type { MetadataRoute } from "next";
import meta from "./data/meta.json";
import { bankGuides } from "./lib/bank-guide";
import { categoryGuides } from "./lib/category-guide";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://www.creditcardpromos.ph";
  const dataPages = [
    "",
    "/guides",
    "/credit-card-promos-philippines",
    ...bankGuides.map((guide) => guide.path),
    ...categoryGuides.map((guide) => guide.path),
  ];
  return [
    ...dataPages.map((path) => ({ url: `${origin}${path || "/"}`, lastModified: meta.checkedAt })),
    { url: `${origin}/privacy-policy` },
    { url: `${origin}/terms-of-use` },
  ];
}
