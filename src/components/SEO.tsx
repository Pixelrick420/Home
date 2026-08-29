import { Helmet } from "react-helmet-async";
import { projects } from "../data/projects";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
}

export default function SEO({
  title = "Hari Krishnan R | Portfolio",
  description = "Creative developer portfolio showcasing projects in web, algorithms, and interactive art.",
  url = "https://pixelrick.is-a.dev/",
}: SEOProps) {
  const ogImage = new URL("og-image.png", url).href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${url}#person`,
              name: "Hari Krishnan R",
              url,
              image: ogImage,
              description,
              jobTitle: "Student",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Government Engineering College, Thrissur",
              },
              sameAs: [
                "https://github.com/Pixelrick420",
                "https://leetcode.com/u/Pixelrick420/",
                "https://www.linkedin.com/in/harikrishnan-r-41b1a3291/",
              ],
              knowsAbout: [
                "Python",
                "Rust",
                "TypeScript",
                "C",
                "React",
                "SvelteKit",
                "Machine Learning",
                "Compilers",
              ],
            },
            {
              "@type": "CollectionPage",
              url,
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
            },
          ],
        })}
      </script>
    </Helmet>
  );
}
