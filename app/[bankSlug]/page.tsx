import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BankPromoGuide from "../components/bank-guide/BankPromoGuide";
import { bankGuideForSlug, bankGuides } from "../lib/bank-guide";

export const dynamicParams = false;

export function generateStaticParams() {
  return bankGuides.map(({ slug }) => ({ bankSlug: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ bankSlug: string }> }): Promise<Metadata> {
  const { bankSlug } = await params;
  const guide = bankGuideForSlug(bankSlug);
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

export default async function BankPromoPage({ params }: { params: Promise<{ bankSlug: string }> }) {
  const { bankSlug } = await params;
  const guide = bankGuideForSlug(bankSlug);
  if (!guide) notFound();
  return <BankPromoGuide guide={guide} />;
}
