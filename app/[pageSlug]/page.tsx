import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BankPromoGuide from "../components/bank-guide/BankPromoGuide";
import CategoryPromoGuide from "../components/category-guide/CategoryPromoGuide";
import { bankGuideForSlug, bankGuides } from "../lib/bank-guide";
import { categoryGuideForSlug, categoryGuides } from "../lib/category-guide";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...bankGuides, ...categoryGuides].map(({ slug }) => ({ pageSlug: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pageSlug: string }> }): Promise<Metadata> {
  const { pageSlug } = await params;
  const guide = bankGuideForSlug(pageSlug) ?? categoryGuideForSlug(pageSlug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: guide.path },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://www.creditcardpromos.ph${guide.path}`,
      siteName: "CreditCardPromos.ph",
      locale: "en_PH",
      type: "website",
    },
    twitter: { card: "summary", title: guide.title, description: guide.description },
  };
}

export default async function PromoGuidePage({ params }: { params: Promise<{ pageSlug: string }> }) {
  const { pageSlug } = await params;
  const bankGuide = bankGuideForSlug(pageSlug);
  if (bankGuide) return <BankPromoGuide guide={bankGuide} />;
  const categoryGuide = categoryGuideForSlug(pageSlug);
  if (categoryGuide) return <CategoryPromoGuide guide={categoryGuide} />;
  notFound();
}
