import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ARTICLES, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import ArticleHero from "@/components/blog/ArticleHero";
import ReadingProgress from "@/components/blog/ReadingProgress";

const ArticleBody     = dynamic(() => import("@/components/blog/ArticleBody"));
const RelatedArticles = dynamic(() => import("@/components/blog/RelatedArticles"));

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const SITE_URL = "https://faizura-trading.sg";

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}/insights/${article.slug}`,
      publishedTime: article.date,
      authors: ["Faizura Trading"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function InsightPage({ params }: { params: Params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Organization",
      name: "Faizura Trading",
    },
    publisher: {
      "@type": "Organization",
      name: "Faizura Trading",
    },
    datePublished: article.date,
    url: `https://faizura-trading.sg/insights/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <Navbar />
      <main>
        <ArticleHero article={article} />
        <ArticleBody blocks={article.body} />
        <RelatedArticles articles={related} />
      </main>
      <Footer />
    </>
  );
}
