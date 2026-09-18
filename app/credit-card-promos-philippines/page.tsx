import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import metaJson from "../data/meta.json";
import promoDataJson from "../data/promos.json";

type Promo = {
  id: string;
  bank: string;
  promo: string;
  category: string;
  categories: string[];
  summary: string;
  startDate: string | null;
  endDate: string | null;
  dateCheck: string;
  cardTypes: string;
  offerUrl: string;
  imageUrl: string;
  originalDateWording: string;
  checkedDate: string;
  dateAdded: string | null;
  sourceRow: number;
};

type PromoMeta = {
  checkedAt: string;
  listedOffers: number;
  banks: string[];
  categories: string[];
};

const promoData = promoDataJson as Promo[];
const promoMeta = metaJson as PromoMeta;
const siteUrl = "https://creditcardpromos-ph.romanogiuseppe341.chatgpt.site";
const pagePath = "/credit-card-promos-philippines";

export const metadata: Metadata = {
  title: "Credit Card Promos Philippines: Best Current Offers",
  description:
    "Compare Philippine credit card and bank-card promos by bank, reward type, promo period, and eligibility. Updated from a live directory of bank offers.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Credit Card Promos Philippines: Best Current Offers",
    description:
      "A data-backed guide to Philippine credit card and bank-card promos, including dining, travel, cashback, installments, and welcome offers.",
    url: `${siteUrl}${pagePath}`,
    siteName: "CreditCardPromos.ph",
    type: "article",
  },
};

const bankColors: Record<string, string> = {
  BDO: "#12337d",
  BPI: "#d9a820",
  BankCom: "#f3c82d",
  Chinabank: "#df2637",
  EastWest: "#9b4c82",
  Maybank: "#f0c929",
  Metrobank: "#2870b9",
  RCBC: "#3c83c8",
  "Security Bank": "#1373a5",
  UnionBank: "#ef7c35",
};

const categoryGuides = [
  {
    title: "Dining Credit Card Promos",
    category: "Dining",
    intent: "Restaurant discounts, buffet deals, hotel dining offers, and spend-based dining rebates.",
    query: "dining credit card promos Philippines",
  },
  {
    title: "Travel Credit Card Promos",
    category: "Travel & Leisure",
    intent: "Hotel stays, flights, resorts, airport perks, and travel-related cardholder discounts.",
    query: "travel credit card promos Philippines",
  },
  {
    title: "Installment Credit Card Promos",
    category: "Installments & Financing",
    intent: "0% installment, gadget, appliance, tuition, and merchant financing offers.",
    query: "installment credit card promos Philippines",
  },
  {
    title: "Shopping Credit Card Promos",
    category: "Shopping",
    intent: "Retail discounts, eGCs, department store offers, and shopping spend promos.",
    query: "shopping credit card promos Philippines",
  },
  {
    title: "Welcome Gift Promos",
    category: "Welcome Gift",
    intent: "New-cardholder rewards, welcome cashback, and acquisition promos.",
    query: "credit card welcome gift promos Philippines",
  },
  {
    title: "Online Credit Card Promos",
    category: "Online",
    intent: "E-commerce, app-based, digital wallet, and online checkout promotions.",
    query: "online credit card promos Philippines",
  },
];

function formatDate(value: string | null) {
  if (!value) return "Check bank page";
  const parsed = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatLongDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function directoryUrl(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  return `/?${searchParams.toString()}#top`;
}

function countBy<T extends string>(items: Promo[], getValues: (promo: Promo) => T[]) {
  const counts = new Map<T, number>();
  items.forEach((promo) => {
    getValues(promo).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function pickFeaturedPromo(promos: Promo[], category: string) {
  return promos
    .filter((promo) => promo.categories.includes(category))
    .sort((a, b) => (a.endDate ?? "9999-12-31").localeCompare(b.endDate ?? "9999-12-31"))[0];
}

const trackedPromos = promoData;
const currentDatedPromos = promoData.filter((promo) => promo.dateCheck === "End date not passed").length;
const unclearDatePromos = promoData.length - currentDatedPromos;
const bankCounts = countBy(trackedPromos, (promo) => [promo.bank]).slice(0, 10);
const categoryCounts = countBy(trackedPromos, (promo) => promo.categories).slice(0, 9);
const sourceCheckedDate = formatLongDate(promoMeta.checkedAt);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Credit Card Promos Philippines",
    url: `${siteUrl}${pagePath}`,
    description:
      "A regularly updated guide to Philippine credit card and bank-card promos by bank, benefit type, promo period, and user intent.",
    dateModified: promoMeta.checkedAt,
    publisher: {
      "@type": "Organization",
      name: "CreditCardPromos.ph",
      url: siteUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Credit Card Promos Philippines",
        item: `${siteUrl}${pagePath}`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are credit card promos in the Philippines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Credit card promos are bank or merchant offers for eligible cardholders, such as dining discounts, cashback, installment deals, travel offers, welcome gifts, or no annual fee promotions.",
        },
      },
      {
        "@type": "Question",
        name: "How do I compare Philippine credit card promos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compare promos by bank, eligible card, reward value, minimum spend, promo period, redemption steps, exclusions, and whether the offer matches your normal spending.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I check credit card promos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Promos change frequently, so it is best to check before applying for a card or before making a large purchase. Always confirm the final terms on the bank's official promo page.",
        },
      },
    ],
  },
];

export default function CreditCardPromosPhilippinesPage() {
  const featuredByCategory = categoryGuides
    .map((guide) => ({ ...guide, promo: pickFeaturedPromo(trackedPromos, guide.category) }))
    .filter((guide) => guide.promo);

  return (
    <main className="guide-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="/" aria-label="Credit Card Promos home">
            <img className="brand-logo" src="/logo.svg" alt="" width="720" height="180" />
          </a>
          <nav className="guide-page-nav" aria-label="Primary navigation">
            <a href="/">Directory</a>
            <a href="/credit-card-promos-philippines">Guide</a>
            <a href="/privacy-policy">Privacy</a>
          </nav>
        </div>
      </header>

      <article>
        <section className="guide-hero">
          <div className="guide-hero-copy">
            <p className="eyebrow">Updated {sourceCheckedDate}</p>
            <h1>Credit Card Promos Philippines: Current Offers Worth Checking First</h1>
            <p className="guide-lede">
              Compare active Philippine credit card promotions by bank, promo type, reward value, and expiry date.
              This guide is built from the CreditCardPromos.ph directory, so it works as both an overview and a
              starting point for deeper promo research.
            </p>
            <div className="guide-actions">
              <a className="primary-guide-link" href="/#top">
                Browse all promos <ArrowRight size={17} />
              </a>
              <a className="secondary-guide-link" href="#best-by-category">
                Compare by promo type
              </a>
            </div>
          </div>

          <aside className="guide-stats" aria-label="Credit card promo coverage">
            <div>
              <strong>{trackedPromos.length.toLocaleString()}</strong>
              <span>listed bank-card promos tracked</span>
            </div>
            <div>
              <strong>{bankCounts.length}</strong>
              <span>Philippine banks covered</span>
            </div>
            <div>
              <strong>{categoryCounts.length}</strong>
              <span>promo categories organized</span>
            </div>
          </aside>
        </section>

        <section className="guide-section guide-summary" aria-labelledby="quick-answer">
          <div>
            <p className="eyebrow">Quick answer</p>
            <h2 id="quick-answer">How to find the best credit card promo for you</h2>
          </div>
          <div className="summary-grid">
            <div>
              <CheckCircle2 size={22} />
              <h3>Start with your spending</h3>
              <p>Dining, travel, shopping, groceries, and installments each reward different behavior. The best promo is usually the one you can use without changing your budget.</p>
            </div>
            <div>
              <CalendarDays size={22} />
              <h3>Check the promo period</h3>
              <p>Short end dates, delayed rewards, registration windows, and redemption deadlines can change the real value of an offer.</p>
            </div>
            <div>
              <ShieldCheck size={22} />
              <h3>Verify the terms</h3>
              <p>Always confirm eligible cards, minimum spend, merchant branches, exclusions, and reward mechanics on the bank's official page before applying or purchasing.</p>
            </div>
          </div>
        </section>

        <section className="guide-section" id="best-by-category" aria-labelledby="category-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Promo types</p>
              <h2 id="category-heading">Best credit card promo categories to compare</h2>
            </div>
            <a href="/#top">Open full directory <ExternalLink size={15} /></a>
          </div>

          <div className="category-guide-grid">
            {featuredByCategory.map((guide) => (
              <a className="category-guide-card" href={directoryUrl({ category: guide.category })} key={guide.category}>
                <span className="guide-card-count">
                  {(categoryCounts.find(([category]) => category === guide.category)?.[1] ?? 0).toLocaleString()} offers
                </span>
                <h3>{guide.title}</h3>
                <p>{guide.intent}</p>
                <div className="featured-offer">
                  <span>Example current offer</span>
                  <strong>{guide.promo?.bank}: {guide.promo?.promo}</strong>
                  <small>{guide.promo?.endDate ? `Valid until ${formatDate(guide.promo.endDate)}` : "Check bank page for dates"}</small>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="guide-section" aria-labelledby="bank-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Bank coverage</p>
              <h2 id="bank-heading">Credit card promos by Philippine bank</h2>
            </div>
          </div>
          <div className="bank-guide-list">
            {bankCounts.map(([bank, count]) => (
              <a className="bank-guide-row" href={directoryUrl({ bank })} key={bank}>
                <span className="bank-dot" style={{ backgroundColor: bankColors[bank] ?? "#2457d6" }} />
                <span>{bank}</span>
                <strong>{count.toLocaleString()} listed promos</strong>
                <ArrowRight size={16} />
              </a>
            ))}
          </div>
        </section>

        <section className="guide-section comparison-section" aria-labelledby="comparison-heading">
          <div>
            <p className="eyebrow">Comparison checklist</p>
            <h2 id="comparison-heading">What to review before choosing a promo</h2>
          </div>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Why it matters</th>
                  <th>What to check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Eligible card</td>
                  <td>Promos may apply only to specific card tiers, networks, or newly issued cards.</td>
                  <td>Card name, Visa/Mastercard/JCB rules, principal vs supplementary eligibility.</td>
                </tr>
                <tr>
                  <td>Minimum spend</td>
                  <td>A large reward can be weak if the spend requirement is unrealistic.</td>
                  <td>Single-receipt spend, accumulated spend, excluded transactions, and installment rules.</td>
                </tr>
                <tr>
                  <td>Reward type</td>
                  <td>Cashback, eGCs, miles, discounts, and welcome gifts have different real-world value.</td>
                  <td>Redemption steps, delivery date, merchant restrictions, and expiration.</td>
                </tr>
                <tr>
                  <td>Promo period</td>
                  <td>Some promos require registration or transactions before a separate deadline.</td>
                  <td>Start date, end date, registration cutoff, claim period, and posting period.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="guide-section methodology-section" aria-labelledby="methodology-heading">
          <div>
            <p className="eyebrow">Methodology</p>
            <h2 id="methodology-heading">How this guide is built</h2>
          </div>
          <div className="methodology-copy">
            <p>
              CreditCardPromos.ph tracks promos from Philippine bank promo pages and organizes them by bank,
              category, dates, and source links. The bank and category counts on this guide use the full tracked
              promo directory, including entries where the bank page needs to be checked for exact card eligibility
              or dates. In the latest data check, {currentDatedPromos.toLocaleString()} listings had end dates that
              had not passed and {unclearDatePromos.toLocaleString()} listings needed date confirmation on the bank page.
            </p>
            <p>
              Promo summaries are meant for comparison. Final eligibility, card coverage, rewards, exclusions,
              registration requirements, and redemption mechanics should always be confirmed on the bank's official
              offer page before you apply, register, or transact.
            </p>
          </div>
        </section>

        <section className="guide-section faq-section" aria-labelledby="faq-heading">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading">Credit card promo questions</h2>
          </div>
          <div className="faq-list">
            <details open>
              <summary>What is the best credit card promo in the Philippines?</summary>
              <p>The best promo depends on your spending pattern. Welcome cashback can be strong for new cardholders, dining promos are useful for frequent restaurant spend, and installment promos are better for planned large purchases.</p>
            </details>
            <details>
              <summary>Are welcome gift promos better than dining or shopping promos?</summary>
              <p>Welcome gift promos can have higher headline value, but they often require approval, minimum spend, and waiting periods. Dining and shopping promos may be easier to use if they match purchases you already planned.</p>
            </details>
            <details>
              <summary>Do all Philippine credit card promos require registration?</summary>
              <p>No. Some promos apply automatically at checkout, while others require SMS, app, landing-page, or merchant registration. Always check the official terms before transacting.</p>
            </details>
            <details>
              <summary>How often are credit card promos updated?</summary>
              <p>This directory was last checked on {sourceCheckedDate}. Because banks can change or end offers, verify time-sensitive promos on the official bank page.</p>
            </details>
          </div>
        </section>

        <section className="guide-cta" aria-labelledby="cta-heading">
          <Sparkles size={24} />
          <div>
            <h2 id="cta-heading">Ready to compare active promos?</h2>
            <p>Use the directory to filter current credit card promos by bank, category, and expiration date.</p>
          </div>
          <a className="primary-guide-link" href="/#top">
            Search promos <Search size={17} />
          </a>
        </section>
      </article>
    </main>
  );
}
