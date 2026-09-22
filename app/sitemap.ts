import type { MetadataRoute } from "next";
import meta from "./data/meta.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://www.creditcardpromos.ph";
  const dataPages = ["", "/guides", "/credit-card-promos-philippines", "/bdo-credit-card-promos-philippines"];
  return [
    ...dataPages.map((path) => ({ url: `${origin}${path || "/"}`, lastModified: meta.checkedAt })),
    { url: `${origin}/privacy-policy` },
    { url: `${origin}/terms-of-use` },
  ];
}
