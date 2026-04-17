import { Helmet } from "react-helmet-async";
import { projects } from "../data/projects";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Hari Krishnan R | Portfolio",
  description = "Creative developer portfolio showcasing projects in web, algorithms, and interactive art.",
  image = "/og-image.png",
  url = "https://pixelrick-resume.vercel.app/",
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projects by Hari Krishnan R",
          description: "A showcase of creative development projects",
          url: "https://pixelrick-resume.vercel.app/",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, idx) => ({
              "@type": "CreativeWork",
              position: idx + 1,
              name: p.title,
              description: p.description,
              url: p.github,
              keywords: p.tags.join(", "),
            })),
          },
        })}
      </script>
    </Helmet>
  );
}
