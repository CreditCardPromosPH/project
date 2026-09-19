import type { Metadata } from "next";
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
          <a className="brand" href="/" aria-label="Credit Card Promos home">
            <img className="brand-logo" src="/logo.svg" alt="" width="720" height="180" />
          </a>
          <nav className="guide-page-nav" aria-label="Primary navigation">
            <a href="/">Directory</a>
            <a href="/guides">Guides</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-use">Terms</a>
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
            <a className="article-link-card" href={article.href} key={article.href}>
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
            </a>
          ))}
        </section>
      </article>
    </main>
  );
}
