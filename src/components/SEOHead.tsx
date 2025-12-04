import { Helmet } from 'react-helmet';
import { SEO_CONFIG, generatePageTitle, generateMetaDescription } from '@/constants/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export const SEOHead = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noIndex = false,
}: SEOHeadProps) => {
  const pageTitle = generatePageTitle(title);
  const pageDescription = generateMetaDescription(description);
  const pageImage = image || `${SEO_CONFIG.siteUrl}/og-image.png`;
  const pageUrl = url || SEO_CONFIG.siteUrl;
  const pageKeywords = keywords || SEO_CONFIG.keywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(', ')} />
      <meta name="author" content={author || SEO_CONFIG.business.name} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SEO_CONFIG.siteName} - Ghana's trusted marketplace`} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="en_GH" />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:site" content={SEO_CONFIG.social.twitter} />
      <meta name="twitter:creator" content={SEO_CONFIG.social.twitter} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Geo Tags for Ghana */}
      <meta name="geo.region" content="GH" />
      <meta name="geo.placename" content="Ghana" />
      <meta name="geo.position" content="7.9465;-1.0232" />
      <meta name="ICBM" content="7.9465, -1.0232" />

      {/* Structured Data for Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": SEO_CONFIG.siteName,
          "description": pageDescription,
          "url": SEO_CONFIG.siteUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${SEO_CONFIG.siteUrl}/marketplace?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": SEO_CONFIG.business.name,
            "logo": {
              "@type": "ImageObject",
              "url": `${SEO_CONFIG.siteUrl}/icon-512.png`
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": SEO_CONFIG.business.phone,
              "email": SEO_CONFIG.business.email,
              "contactType": "customer service",
              "areaServed": "GH",
              "availableLanguage": ["English", "Twi"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Accra",
              "addressCountry": "GH"
            }
          }
        })}
      </script>
    </Helmet>
  );
};
