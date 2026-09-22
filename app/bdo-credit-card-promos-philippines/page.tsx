import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, ChevronRight, CreditCard, ExternalLink } from "lucide-react";
import promosJson from "../data/promos.json";
import meta from "../data/meta.json";
import { bankDirectoryUrl, bankPromosForPage, formatPromoDate, manilaDate, promoStatus, selectCategoryPromos } from "../lib/bank-promos";
import PromoImage from "./promo-image";
import styles from "./page.module.css";

const siteUrl = "https://www.creditcardpromos.ph";
const pagePath = "/bdo-credit-card-promos-philippines";
const title = "BDO Credit Card Promos Philippines | Current Offers";
const description = "Compare current BDO credit card promos for dining, shopping, travel, installments, and more. Check offer dates, eligible cards, and official BDO terms.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  openGraph: { title, description, url: `${siteUrl}${pagePath}`, siteName: "CreditCardPromos.ph", locale: "en_PH", type: "website" },
  twitter: { card: "summary", title, description },
};

const categories = [
  { id: "dining", label: "Dining", category: "Dining", heading: "BDO dining promos", description: "Restaurant discounts, hotel dining, and dining privileges. Check the eligible card, dining day, minimum bill, and participating branch for each offer." },
  { id: "shopping", label: "Shopping", category: "Shopping", heading: "BDO shopping promos", description: "Retail discounts and shopping rewards. Compare the qualifying spend and discount cap, and check whether sale items or installment purchases qualify." },
  { id: "travel", label: "Travel", category: "Travel & Leisure", heading: "BDO travel promos", description: "Airline, hotel, and travel offers. Check booking dates separately from travel dates, plus the required booking channel and any blackout periods." },
  { id: "installments", label: "Installments", category: "Installments & Financing", heading: "BDO installment promos", description: "Installment and Buy Now Pay Later offers for planned purchases. Confirm the available payment terms, minimum purchase, fees, and first payment date with BDO and the merchant." },
  { id: "online", label: "Online", category: "Online", heading: "BDO online promos", description: "Online shopping and booking offers. Check for a promo code, a designated checkout link, a card-network restriction, or a limit on redemptions." },
  { id: "welcome-gifts", label: "Welcome gifts", category: "Welcome Gift", heading: "BDO welcome gift promos", description: "Card acquisition and welcome offers. Read the definition of an eligible new cardholder, the application and approval dates, and the qualifying spend period." },
];

const questions = [
  { question: "What BDO credit card promos are currently available?", answer: "This page tracks current BDO dining, travel, shopping, online, installment, and welcome gift promotions. Listings, counts, and dates update with our daily data refresh. The full directory includes other BDO offers that are not shown in the category selections." },
  { question: "Do all BDO credit cards qualify for every promo?", answer: "No. Our BDO listings include offers described as JCB Platinum, UnionPay, American Express, and BDO Elite exclusives. Check the exact card name, network, and tier in the official terms; a BDO card alone does not establish eligibility." },
  { question: "Do I need to register for a BDO promo?", answer: "Registration and redemption requirements depend on the offer. Before paying, check the official BDO terms for any registration step, promo code, designated booking link, or qualifying purchase channel." },
  { question: "Are BDO debit cards included?", answer: "This page selects listings tagged for credit cards. Some also include debit cards, as indicated on the card. These are broad categories from the source data; the official terms identify the specific eligible cards." },
  { question: "How can I confirm an offer's dates and terms?", answer: "Use the official BDO link on each card. The displayed end date comes from our source data and may differ from a travel, redemption, or reward-crediting deadline. Check the full promotion mechanics before transacting." },
];

export default function BdoPromosPage() {
  const today = manilaDate();
  const promos = bankPromosForPage(promosJson, "BDO", today);
  const sections = selectCategoryPromos(promos, categories);
  const visiblePromos = sections.flatMap((section) => section.cards);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${siteUrl}${pagePath}#webpage`, name: title, headline: "BDO Credit Card Promos Philippines", description, url: `${siteUrl}${pagePath}`, inLanguage: "en-PH", dateModified: meta.checkedAt,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "CreditCardPromos.ph", url: siteUrl },
      about: { "@type": "Thing", name: "BDO credit card promotions in the Philippines" },
      mainEntity: { "@id": `${siteUrl}${pagePath}#promo-list` },
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "CreditCardPromos.ph", url: siteUrl } },
    { "@context": "https://schema.org", "@type": "ItemList", "@id": `${siteUrl}${pagePath}#promo-list`, name: "Current BDO credit card promos", numberOfItems: visiblePromos.length,
      itemListElement: visiblePromos.map((promo, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Thing", name: promo.promo, ...(promo.offerUrl ? { url: promo.offerUrl } : {}) } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "BDO credit card promos", item: `${siteUrl}${pagePath}` },
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
    })) },
  ];

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#bdo-content">Skip to BDO promos</a>
      <header className={`site-header ${styles.header}`}>
        <div className={`site-header-inner ${styles.headerInner}`}>
          <Link className="brand" href="/" aria-label="Credit Card Promos home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-logo" src="/logo.svg" alt="" width="720" height="180" />
          </Link>
          <nav className={styles.headerNav} aria-label="Primary navigation">
            <Link href="/">All promos</Link><Link href="/guides">Guides</Link>
          </nav>
        </div>
      </header>

      <main className={styles.content} id="bdo-content">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">BDO promos</span>
        </nav>
        <div className={styles.intro}>
          <p className={styles.kicker}>Bank promo guide</p>
          <h1>BDO Credit Card Promos Philippines</h1>
          <p className={styles.lede}>Browse BDO offers for dining, shopping, travel, installments, and online purchases. Compare the listed dates and card types, then check the full terms with BDO.</p>
          <div className={styles.introLinks}>
            <span><CalendarDays size={16} aria-hidden="true" /> Last checked <time dateTime={meta.checkedAt}>{formatPromoDate(meta.checkedAt)}</time></span>
            <a href={bankDirectoryUrl("BDO")}>Browse all BDO offers <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <section className={styles.snapshot} aria-label="BDO promo snapshot">
          <dl>
            <div><dt>BDO offers listed</dt><dd>{promos.length.toLocaleString()}</dd></div>
          </dl>
          <p>Some offers include debit cards. The sections below show up to three recent listings per category; <a href={bankDirectoryUrl("BDO")}>browse the complete BDO directory</a> for all matching offers and check the specific eligible card and terms on BDO&apos;s official offer page.</p>
        </section>

        {sections.length > 0 ? <>
          <nav className={styles.categories} aria-label="BDO promo categories">
            {sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label} <ChevronDown size={14} aria-hidden="true" /></a>)}
          </nav>
          {sections.map((section) => (
            <section className={styles.category} id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className={styles.sectionHeading}>
                <div><h2 id={`${section.id}-heading`}>{section.heading}</h2><p>{section.description}</p></div>
                <a className={styles.viewAll} href={bankDirectoryUrl("BDO", section.category)}>View all {section.count} {section.label.toLowerCase()} offers <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
              <div className={styles.promoGrid}>
                {section.cards.map((promo) => (
                  <article className={styles.promoCard} key={promo.id}>
                    <div className={styles.promoMedia}><PromoImage src={promo.imageUrl} alt={`BDO credit card promo: ${promo.promo}`} /></div>
                    <div className={styles.cardBody}>
                      <h3>{promo.promo}</h3>
                      {promo.summary && <p>{promo.summary}</p>}
                      <dl className={styles.cardDetails}>
                        <div><dt><CreditCard size={16} aria-hidden="true" /><span className={styles.srOnly}>Card type</span></dt><dd>{promo.cardTypes.replaceAll(";", " / ")}</dd></div>
                        <div><dt><CalendarDays size={16} aria-hidden="true" /><span className={styles.srOnly}>Listed end date</span></dt><dd>{promoStatus(promo, today) === "check" ? "Confirm dates with BDO" : <>Listed until <time dateTime={promo.endDate!}>{formatPromoDate(promo.endDate)}</time></>}</dd></div>
                      </dl>
                      {promo.offerUrl ? <a className={styles.officialLink} href={promo.offerUrl} target="_blank" rel="noopener noreferrer" aria-label={`View official BDO offer: ${promo.promo} (opens in a new tab)`}>View official BDO offer <ExternalLink size={15} aria-hidden="true" /></a> : <span className={styles.missingLink}>Official link unavailable</span>}
                    </div>
                  </article>
                ))}
              </div>
              {!section.cards.length && <p className={styles.note}>Offers in this category are also shown above. See the full category for all matching listings.</p>}
            </section>
          ))}
        </> : <section className={styles.category}><h2>Check back for BDO offers</h2><p>No offers are available in these categories in the current dataset.</p><a className={styles.viewAll} href={bankDirectoryUrl("BDO")}>Open the BDO directory <ArrowRight size={16} /></a></section>}

        <p className={styles.note}>Category totals can overlap because an offer may have more than one category. <a href={bankDirectoryUrl("BDO")}>Browse the complete BDO directory</a> for more listings.</p>

        <section className={styles.editorial} aria-labelledby="eligibility-heading">
          <div><p className={styles.kicker}>Before you pay</p><h2 id="eligibility-heading">How BDO credit card promos work</h2></div>
          <div className={styles.checklist}>
            <div><h3>Match the card, network, and tier</h3><p>A JCB Platinum exclusive or UnionPay offer may not apply to another BDO card. Confirm the exact eligible cards and whether supplementary cardholders qualify.</p></div>
            <div><h3>Check the purchase conditions</h3><p>Look for a minimum spend, maximum discount, participating branches, and excluded items. Confirm whether the required spend is in one receipt or accumulated across transactions.</p></div>
            <div><h3>Check how to claim the benefit</h3><p>An upfront discount, cashback, and a welcome reward have different mechanics. Look for registration requirements and when and how the benefit will be received.</p></div>
            <div><h3>Separate the deadlines</h3><p>A booking deadline is not necessarily the last date you can travel. Read the purchase, registration, redemption, and travel periods in the official terms.</p></div>
          </div>
        </section>

        <section className={styles.editorial} aria-labelledby="compare-heading">
          <h2 id="compare-heading">How to choose the right BDO promo</h2>
          <div className={styles.copy}><p>Start with a purchase you already plan to make. For dining, compare the final bill after any discount cap and minimum spend. For travel, compare the total booking cost and the available dates. For installments, check the total amount payable and the payment schedule.</p><p>Our selection is organized by category and favors recently added listings with usable dates. It is not a ranking of the best deals. For offers from other banks, visit our <Link href="/credit-card-promos-philippines">Philippine credit card promo guide</Link>.</p></div>
        </section>

        <section className={styles.editorial} aria-labelledby="faq-heading">
          <h2 id="faq-heading">Frequently asked questions about BDO promos</h2>
          <div className={styles.faq}>{questions.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>

        <section className={styles.editorial} aria-labelledby="about-heading">
          <h2 id="about-heading">About this page</h2>
          <div className={styles.copy}><p>CreditCardPromos.ph is an independent directory, not BDO&apos;s official website. These listings come from our daily bank-promo dataset, last checked on <time dateTime={meta.checkedAt}>{formatPromoDate(meta.checkedAt)}</time>.</p><p>We exclude entries with a listed end date before today or a future start date from this page. Missing or uncertain dates need confirmation. Summaries and broad card-type labels do not include every eligibility rule, spend requirement, or exclusion; use the official BDO links to confirm the full terms.</p></div>
        </section>
      </main>
      <footer className={styles.footer}><Link href="/">All bank promos</Link><Link href="/guides">Guides</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-use">Terms</Link></footer>
    </div>
  );
}
