import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/checkout/confirmation", "/wishlist", "/account/", "/sourcing/import"],
      },
    ],
    sitemap: "https://allthings.store/sitemap.xml",
  };
}
