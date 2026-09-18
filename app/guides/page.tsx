import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides & Articles | CreditCardPromos.ph",
  description:
    "Practical guides for comparing Philippine credit card promotions by bank, category, and offer type.",
};

const articles = [
  {
    title: "Credit Card Promos Philippines: Current Offers Worth Checking First",
    description:
      "Compare active Philippine credit card promotions by bank, promo type, reward value, and expiry date.",
    href: "/credit-card-promos-philippines",
    label: "Credit card guide",
  },
];

export default function GuidesPage() {
  return (
    <main className="guides-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand" href="/" aria-label="Credit Card Promos home">
            <img className="brand-logo" src="/logo.svg" alt="" width="720" height="180" />
          </Link>
          <nav className="guides-page-nav" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-use">Terms</Link>
          </nav>
        </div>
      </header>

      <section className="guides-index" aria-labelledby="guides-heading">
        <p className="eyebrow">CreditCardPromos.ph library</p>
        <h1 id="guides-heading">Guides &amp; Articles</h1>
        <p className="guides-index-lede">
          Helpful ways to compare credit card promotions, understand offer types, and find deals worth checking.
        </p>

        <div className="article-list">
          {articles.map((article) => (
            <Link className="article-card" href={article.href} key={article.href}>
              <div>
                <span className="article-card-label">{article.label}</span>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </div>
              <span className="article-card-arrow" aria-hidden="true">
                <ArrowRight size={24} />
              </span>
            </Link>
          ))}
        </div>

        <div className="guides-index-note">
          <BookOpen size={20} aria-hidden="true" />
          <p>New guides and explainers will be added here as the library grows.</p>
        </div>
      </section>
    </main>
  );
}
