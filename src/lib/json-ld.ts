import { siteConfig, contact, personal, social } from "@/data/portfolio";

/** JSON.stringify escaped for safe inline use inside `<script type="application/ld+json">`. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.displayName,
    alternateName: personal.professionalName,
    jobTitle: personal.title,
    email: `mailto:${contact.email}`,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phnom Penh",
      addressCountry: "KH",
    },
    sameAs: [social.github, social.linkedin].filter(
      (value): value is string => typeof value === "string" && value.length > 0,
    ),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
