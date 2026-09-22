import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, ChevronRight, CreditCard, ExternalLink } from "lucide-react";
import promosJson from "../../data/promos.json";
import meta from "../../data/meta.json";
import { bankDirectoryUrl, bankPromosForPage, formatPromoDate, manilaDate, promoStatus, selectCategoryPromos } from "../../lib/bank-promos";
import type { BankGuide } from "../../lib/bank-guide";
import PromoImage from "./PromoImage";
import styles from "./page.module.css";

const siteUrl = "https://www.creditcardpromos.ph";

const categoryDefinitions = [
  { id: "dining", label: "Dining", category: "Dining", description: "Restaurant discounts, hotel dining, and dining privileges. Check the eligible card, dining day, minimum bill, and participating branch for each offer." },
  { id: "shopping", label: "Shopping", category: "Shopping", description: "Retail discounts and shopping rewards. Compare the qualifying spend and discount cap, and check whether sale items or installment purchases qualify." },
  { id: "travel", label: "Travel", category: "Travel & Leisure", description: "Airline, hotel, and travel offers. Check booking dates separately from travel dates, plus the required booking channel and any blackout periods." },
  { id: "installments", label: "Installments", category: "Installments & Financing", description: "Installment and Buy Now Pay Later offers for planned purchases. Confirm the available payment terms, minimum purchase, fees, and first payment date with the bank and merchant." },
  { id: "online", label: "Online", category: "Online", description: "Online shopping and booking offers. Check for a promo code, designated checkout link, card-network restriction, or limit on redemptions." },
  { id: "welcome-gifts", label: "Welcome gifts", category: "Welcome Gift", description: "Card acquisition and welcome offers. Read the definition of an eligible new cardholder, the application and approval dates, and the qualifying spend period." },
  { id: "health-wellness", label: "Health & wellness", category: "Health & Wellness", description: "Health, wellness, beauty, and personal care offers. Check participating providers, covered services, and any appointment or payment requirements." },
  { id: "services", label: "Services", category: "Services", description: "Service-related discounts and cardholder privileges. Confirm the participating provider, booking process, and exclusions before using the offer." },
  { id: "other", label: "Other offers", category: "Other", description: "Additional bank promotions that do not fit the main categories. Review the official terms for the exact benefit and eligibility rules." },
];

function questionsFor(bank: string) {
  return [
    { question: `What ${bank} credit card promos are currently available?`, answer: `This page tracks current ${bank} dining, travel, shopping, online, installment, and welcome gift promotions. Listings, counts, and dates update with our daily data refresh. The full directory includes other ${bank} offers that are not shown in the category selections.` },
    { question: `Do all ${bank} credit cards qualify for every promo?`, answer: `No. ${bank} offers can be limited to a specific card name, network, tier, or newly issued card. Check the exact eligible card and the official terms; holding a ${bank} card alone does not establish eligibility.` },
    { question: `Do I need to register for a ${bank} promo?`, answer: `Registration and redemption requirements depend on the offer. Before paying, check the official ${bank} terms for any registration step, promo code, designated booking link, or qualifying purchase channel.` },
    { question: `Are ${bank} debit cards included?`, answer: `This page selects listings tagged for credit cards. Some offers also include debit cards, as indicated on the listing. The official terms identify the specific eligible cards.` },
    { question: `How can I confirm a ${bank} offer's dates and terms?`, answer: `Use the official ${bank} link on each card. The displayed end date comes from our source data and may differ from a travel, redemption, or reward-crediting deadline. Check the full promotion mechanics before transacting.` },
  ];
}

export default function BankPromoGuide({ guide }: { guide: BankGuide }) {
  const today = manilaDate();
  const promos = bankPromosForPage(promosJson, guide.bank, today);
  const categories = categoryDefinitions.map((category) => ({
    ...category,
    heading: `${guide.bank} ${category.label.toLowerCase()} promos`,
  }));
  const sections = selectCategoryPromos(promos, categories);
  const visiblePromos = sections.flatMap((section) => section.cards);
  const questions = questionsFor(guide.bank);
  const categoryNames = sections.map((section) => section.label.toLowerCase());
  const categorySummary = categoryNames.length > 1
    ? `${categoryNames.slice(0, -1).join(", ")}, and ${categoryNames.at(-1)}`
    : categoryNames[0] ?? "available categories";
  const pageUrl = `${siteUrl}${guide.path}`;
  const structuredData = [
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${pageUrl}#webpage`,
      name: guide.title, headline: `${guide.bank} Credit Card Promos Philippines`, description: guide.description,
      url: pageUrl, inLanguage: "en-PH", dateModified: meta.checkedAt,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "CreditCardPromos.ph", url: siteUrl },
      about: { "@type": "Thing", name: `${guide.bank} credit card promotions in the Philippines` },
      mainEntity: { "@id": `${pageUrl}#promo-list` },
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "CreditCardPromos.ph", url: siteUrl },
    },
    {
      "@context": "https://schema.org", "@type": "ItemList", "@id": `${pageUrl}#promo-list`,
      name: `Current ${guide.bank} credit card promos`, numberOfItems: visiblePromos.length,
      itemListElement: visiblePromos.map((promo, index) => ({
        "@type": "ListItem", position: index + 1,
        item: { "@type": "Thing", name: promo.promo, ...(promo.offerUrl ? { url: promo.offerUrl } : {}) },
      })),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: `${guide.bank} credit card promos`, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: questions.map(({ question, answer }) => ({
        "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#bank-content">Skip to {guide.bank} promos</a>
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

      <main className={styles.content} id="bank-content">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{guide.bank} promos</span>
        </nav>
        <div className={styles.intro}>
          <p className={styles.kicker}>Bank promo guide</p>
          <h1>{guide.bank} Credit Card Promos Philippines</h1>
          <p className={styles.lede}>Browse current {guide.bank} credit card promos across {categorySummary}. Compare listed dates and card types, then check the full terms with {guide.bank}.</p>
          <div className={styles.introLinks}>
            <span><CalendarDays size={16} aria-hidden="true" /> Last checked <time dateTime={meta.checkedAt}>{formatPromoDate(meta.checkedAt, guide.bank)}</time></span>
            <a href={bankDirectoryUrl(guide.bank)}>Browse all {guide.bank} offers <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <section className={styles.snapshot} aria-label={`${guide.bank} promo snapshot`}>
          <dl><div><dt>{guide.bank} offers listed</dt><dd>{promos.length.toLocaleString()}</dd></div></dl>
          <p>Some offers include debit cards. The sections below show up to three recent listings per category; <a href={bankDirectoryUrl(guide.bank)}>browse the complete {guide.bank} directory</a> for all matching offers and check the specific eligible card and terms on the official {guide.bank} offer page.</p>
        </section>

        {sections.length > 0 ? <>
          <nav className={styles.categories} aria-label={`${guide.bank} promo categories`}>
            {sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label} <ChevronDown size={14} aria-hidden="true" /></a>)}
          </nav>
          {sections.map((section) => (
            <section className={styles.category} id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className={styles.sectionHeading}>
                <div><h2 id={`${section.id}-heading`}>{section.heading}</h2><p>{section.description}</p></div>
                <a className={styles.viewAll} href={bankDirectoryUrl(guide.bank, section.category)}>View all {section.count} {section.label.toLowerCase()} offers <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
              <div className={styles.promoGrid}>
                {section.cards.map((promo) => (
                  <article className={styles.promoCard} key={promo.id}>
                    <div className={styles.promoMedia}><PromoImage src={promo.imageUrl} alt={`${guide.bank} credit card promo: ${promo.promo}`} bank={guide.bank} /></div>
                    <div className={styles.cardBody}>
                      <h3>{promo.promo}</h3>
                      {promo.summary && <p>{promo.summary}</p>}
                      <dl className={styles.cardDetails}>
                        <div><dt><CreditCard size={16} aria-hidden="true" /><span className={styles.srOnly}>Card type</span></dt><dd>{promo.cardTypes.replaceAll(";", " / ")}</dd></div>
                        <div><dt><CalendarDays size={16} aria-hidden="true" /><span className={styles.srOnly}>Listed end date</span></dt><dd>{promoStatus(promo, today) === "check" ? `Confirm dates with ${guide.bank}` : <>Listed until <time dateTime={promo.endDate!}>{formatPromoDate(promo.endDate, guide.bank)}</time></>}</dd></div>
                      </dl>
                      {promo.offerUrl ? <a className={styles.officialLink} href={promo.offerUrl} target="_blank" rel="noopener noreferrer" aria-label={`View official ${guide.bank} offer: ${promo.promo} (opens in a new tab)`}>View official {guide.bank} offer <ExternalLink size={15} aria-hidden="true" /></a> : <span className={styles.missingLink}>Official link unavailable</span>}
                    </div>
                  </article>
                ))}
              </div>
              {!section.cards.length && <p className={styles.note}>Offers in this category are also shown above. See the full category for all matching listings.</p>}
            </section>
          ))}
        </> : <section className={styles.category}><h2>Check back for {guide.bank} offers</h2><p>No offers are available in these categories in the current dataset.</p><a className={styles.viewAll} href={bankDirectoryUrl(guide.bank)}>Open the {guide.bank} directory <ArrowRight size={16} /></a></section>}

        <p className={styles.note}>Category totals can overlap because an offer may have more than one category. <a href={bankDirectoryUrl(guide.bank)}>Browse the complete {guide.bank} directory</a> for more listings.</p>

        <section className={styles.editorial} aria-labelledby="eligibility-heading">
          <div><p className={styles.kicker}>Before you pay</p><h2 id="eligibility-heading">How {guide.bank} credit card promos work</h2></div>
          <div className={styles.checklist}>
            <div><h3>Match the card, network, and tier</h3><p>A promo may apply only to a specific {guide.bank} card, network, or tier. Confirm the exact eligible cards and whether supplementary cardholders qualify.</p></div>
            <div><h3>Check the purchase conditions</h3><p>Look for a minimum spend, maximum discount, participating branches, and excluded items. Confirm whether the required spend is in one receipt or accumulated across transactions.</p></div>
            <div><h3>Check how to claim the benefit</h3><p>An upfront discount, cashback, and a welcome reward have different mechanics. Look for registration requirements and when and how the benefit will be received.</p></div>
            <div><h3>Separate the deadlines</h3><p>A booking deadline is not necessarily the last date you can travel. Read the purchase, registration, redemption, and travel periods in the official terms.</p></div>
          </div>
        </section>

        <section className={styles.editorial} aria-labelledby="compare-heading">
          <h2 id="compare-heading">How to choose the right {guide.bank} promo</h2>
          <div className={styles.copy}><p>Start with a purchase you already plan to make. For dining, compare the final bill after any discount cap and minimum spend. For travel, compare the total booking cost and available dates. For installments, check the total amount payable and the payment schedule.</p><p>Our selection is organized by category and favors recently added listings with usable dates. It is not a ranking of the best deals. For offers from other banks, visit our <Link href="/credit-card-promos-philippines">Philippine credit card promo guide</Link>.</p></div>
        </section>

        <section className={styles.editorial} aria-labelledby="faq-heading">
          <h2 id="faq-heading">Frequently asked questions about {guide.bank} promos</h2>
          <div className={styles.faq}>{questions.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>

        <section className={styles.editorial} aria-labelledby="about-heading">
          <h2 id="about-heading">About this page</h2>
          <div className={styles.copy}><p>CreditCardPromos.ph is an independent directory, not {guide.bank}&apos;s official website. These listings come from our daily bank-promo dataset, last checked on <time dateTime={meta.checkedAt}>{formatPromoDate(meta.checkedAt, guide.bank)}</time>.</p><p>We exclude entries with a listed end date before today or a future start date from this page. Missing or uncertain dates need confirmation. Summaries and broad card-type labels do not include every eligibility rule, spend requirement, or exclusion; use the official {guide.bank} links to confirm the full terms.</p></div>
        </section>
      </main>
      <footer className={styles.footer}><Link href="/">All bank promos</Link><Link href="/guides">Guides</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-use">Terms</Link></footer>
    </div>
  );
}
