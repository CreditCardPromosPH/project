import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import metaJson from "../data/meta.json";

type PromoMeta = {
  checkedAt: string;
  listedOffers: number;
  banks: string[];
  categories: string[];
};

const promoMeta = metaJson as PromoMeta;

function formatLongDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const articles = [
  {
    title: "BDO Credit Card Promos Philippines",
    description:
      "Browse BDO offers by category, compare listed dates and card types, and check the official terms before you spend.",
    href: "/bdo-credit-card-promos-philippines",
    updated: formatLongDate(promoMeta.checkedAt),
    kicker: "BDO promo guide",
  },
  {
    title: "Credit Card Promos Philippines: Best Current Offers",
    description:
      "A practical guide to comparing Philippine credit card promos by bank, promo type, reward value, and expiry date.",
    href: "/credit-card-promos-philippines",
    updated: formatLongDate(promoMeta.checkedAt),
    kicker: "Credit card promo guide",
  },
];

export const metadata: Metadata = {
  title: "Guides | CreditCardPromos.ph",
  description:
    "Read CreditCardPromos.ph guides for comparing Philippine credit card promos, dining offers, travel deals, cashback, installments, and welcome gifts.",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesPage() {
  return (
    <main className="guide-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand" href="/" aria-label="Credit Card Promos home">
            <img className="brand-logo" src="/logo.svg" alt="" width="720" height="180" />
          </Link>
          <nav className="guide-page-nav" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-use">Terms</Link>
          </nav>
        </div>
      </header>

      <article className="guides-index">
        <section className="guides-index-hero">
          <p className="eyebrow">Guides</p>
          <h1>Credit Card Promo Guides</h1>
          <p>
            Read practical guides for comparing Philippine credit card promos, finding current offers, and checking
            the details that matter before you spend.
          </p>
        </section>

        <section className="articles-list" aria-label="All guide articles">
          {articles.map((article) => (
            <Link className="article-link-card" href={article.href} key={article.href}>
              <span className="article-icon" aria-hidden="true">
                <BookOpen size={24} />
              </span>
              <span className="article-card-copy">
                <span className="article-kicker">{article.kicker}</span>
                <strong>{article.title}</strong>
                <span>{article.description}</span>
                <span className="article-updated">
                  <CalendarDays size={16} />
                  Updated {article.updated}
                </span>
              </span>
              <ArrowRight className="article-arrow" size={22} aria-hidden="true" />
            </Link>
          ))}
        </section>
      </article>
    </main>
  );
}
