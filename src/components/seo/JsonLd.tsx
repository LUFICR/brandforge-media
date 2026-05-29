export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BrandForge Media",
    url: "https://brandforge-media.vercel.app",
    logo: "https://brandforge-media.vercel.app/logo.png",
    description:
      "Premium digital marketing agency offering social media management, website design, branding, and SEO services.",
    telephone: "+919311267085",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [
      "https://instagram.com/brandforgemedia",
      "https://linkedin.com/company/brandforgemedia",
    ],
    foundingDate: "2019",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919311267085",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BrandForge Media",
    url: "https://brandforge-media.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://brandforge-media.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BrandForge Media",
    url: "https://brandforge-media.vercel.app",
    telephone: "+919311267085",
    priceRange: "$$",
    description:
      "Premium digital marketing agency specializing in social media management, website design, branding, graphic & video editing, and SEO services.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Social Media Management" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Website Designing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Graphic & Video Editing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Branding & Promotions" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Digital Marketing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "SEO Marketing" },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
