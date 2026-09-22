import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronRight, CreditCard, ExternalLink } from "lucide-react";
import promosJson from "../../data/promos.json";
import meta from "../../data/meta.json";
import { bankDirectoryUrl, currentPromosForPage, formatPromoDate, manilaDate, promoStatus } from "../../lib/bank-promos";
import { bankGuides } from "../../lib/bank-guide";
import { categoryGuides, type CategoryGuide } from "../../lib/category-guide";
import PromoImage from "../bank-guide/PromoImage";
import styles from "../bank-guide/page.module.css";

const siteUrl = "https://www.creditcardpromos.ph";

export default function CategoryPromoGuide({ guide }: { guide: CategoryGuide }) {
  const today = manilaDate();
  const promos = currentPromosForPage(promosJson, today).filter((promo) => promo.categories.includes(guide.category));
  const bankSections = bankGuides
    .map((bank) => ({ ...bank, promos: promos.filter((promo) => promo.bank === bank.bank) }))
    .filter((bank) => bank.promos.length > 0);
  const visiblePromos = bankSections.flatMap((section) => section.promos.slice(0, 3));
  const pageUrl = `${siteUrl}${guide.path}`;
  const structuredData = [
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${pageUrl}#webpage`,
      name: guide.title, headline: `${guide.label} Credit Card Promos Philippines`, description: guide.description,
      url: pageUrl, inLanguage: "en-PH", dateModified: meta.checkedAt,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "CreditCardPromos.ph", url: siteUrl },
      about: { "@type": "Thing", name: `${guide.label} credit card promotions in the Philippines` },
      mainEntity: { "@id": `${pageUrl}#promo-list` },
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "CreditCardPromos.ph", url: siteUrl },
    },
    {
      "@context": "https://schema.org", "@type": "ItemList", "@id": `${pageUrl}#promo-list`,
      name: `Current ${guide.label.toLowerCase()} credit card promos`, numberOfItems: visiblePromos.length,
      itemListElement: visiblePromos.map((promo, index) => ({
        "@type": "ListItem", position: index + 1,
        item: { "@type": "Thing", name: promo.promo, ...(promo.offerUrl ? { url: promo.offerUrl } : {}) },
      })),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: `${guide.label} credit card promos`, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: guide.questions.map(({ question, answer }) => ({
        "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#category-content">Skip to {guide.label.toLowerCase()} promos</a>
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

      <main className={styles.content} id="category-content">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{guide.label} promos</span>
        </nav>
        <div className={styles.intro}>
          <p className={styles.kicker}>Promo category guide</p>
          <h1>{guide.label} Credit Card Promos Philippines</h1>
          <p className={styles.lede}>{guide.intro}</p>
          <div className={styles.introLinks}>
            <span><CalendarDays size={16} aria-hidden="true" /> Last checked <time dateTime={meta.checkedAt}>{formatPromoDate(meta.checkedAt)}</time></span>
            <Link href="/#top">Browse all current promos <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <section className={styles.snapshot} aria-label={`${guide.label} promo snapshot`}>
          <dl>
            <div><dt>Current offers listed</dt><dd>{promos.length.toLocaleString()}</dd></div>
            <div><dt>Banks covered</dt><dd>{bankSections.length.toLocaleString()}</dd></div>
          </dl>
          <p>Offers are grouped by bank below. Each card links to the official source, and the full terms should be checked before you transact.</p>
        </section>

        <nav className={styles.categories} aria-label="Promo category navigation">
          {categoryGuides.map((category) => <Link key={category.slug} href={category.path}>{category.label} promos</Link>)}
        </nav>

        {bankSections.map((section) => (
          <section className={styles.category} id={section.slug} key={section.bank} aria-labelledby={`${section.slug}-heading`}>
            <div className={styles.sectionHeading}>
              <div><h2 id={`${section.slug}-heading`}>{section.bank} {guide.label.toLowerCase()} credit card promos</h2><p>{section.promos.length.toLocaleString()} current {guide.label.toLowerCase()} listings from {section.bank}. Compare the individual offer terms before relying on the headline benefit.</p></div>
              <Link className={styles.viewAll} href={section.path}>View all {section.bank} offers <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className={styles.promoGrid}>
              {section.promos.slice(0, 3).map((promo) => (
                <article className={styles.promoCard} key={promo.id}>
                  <div className={styles.promoMedia}><PromoImage src={promo.imageUrl} alt={`${section.bank} ${guide.label.toLowerCase()} credit card promo: ${promo.promo}`} bank={section.bank} /></div>
                  <div className={styles.cardBody}>
                    <h3>{promo.promo}</h3>
                    {promo.summary && <p>{promo.summary}</p>}
                    <dl className={styles.cardDetails}>
                      <div><dt><CreditCard size={16} aria-hidden="true" /><span className={styles.srOnly}>Card type</span></dt><dd>{promo.cardTypes ? promo.cardTypes.replaceAll(";", " / ") : "Check official terms"}</dd></div>
                      <div><dt><CalendarDays size={16} aria-hidden="true" /><span className={styles.srOnly}>Listed end date</span></dt><dd>{promoStatus(promo, today) === "check" ? `Confirm dates with ${section.bank}` : <>Listed until <time dateTime={promo.endDate!}>{formatPromoDate(promo.endDate, section.bank)}</time></>}</dd></div>
                    </dl>
                    {promo.offerUrl ? <a className={styles.officialLink} href={promo.offerUrl} target="_blank" rel="noopener noreferrer" aria-label={`View official ${section.bank} offer: ${promo.promo} (opens in a new tab)`}>View official {section.bank} offer <ExternalLink size={15} aria-hidden="true" /></a> : <span className={styles.missingLink}>Official link unavailable</span>}
                  </div>
                </article>
              ))}
            </div>
            {section.promos.length > 3 && <p className={styles.note}><Link href={bankDirectoryUrl(section.bank, guide.category)}>Browse all {section.promos.length} {section.bank} {guide.label.toLowerCase()} offers</Link>.</p>}
          </section>
        ))}

        <section className={styles.editorial} aria-labelledby="compare-heading">
          <div><p className={styles.kicker}>Before you pay</p><h2 id="compare-heading">How to compare {guide.label.toLowerCase()} credit card promos</h2></div>
          <div className={styles.checklist}>
            {guide.checklist.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}
          </div>
        </section>

        <section className={styles.editorial} aria-labelledby="faq-heading">
          <h2 id="faq-heading">Frequently asked questions about {guide.label.toLowerCase()} promos</h2>
          <div className={styles.faq}>{guide.questions.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>

        <section className={styles.editorial} aria-labelledby="about-heading">
          <h2 id="about-heading">About this page</h2>
          <div className={styles.copy}><p>CreditCardPromos.ph is an independent directory, not a bank or card issuer. These {guide.label.toLowerCase()} listings come from our daily bank-promo dataset, last checked on <time dateTime={meta.checkedAt}>{formatPromoDate(meta.checkedAt)}</time>.</p><p>We exclude entries with a listed end date before today or a future start date. Missing or uncertain dates need confirmation. Summaries do not include every eligibility rule, spend requirement, blackout date, or exclusion; use the official bank links to confirm the full terms.</p></div>
        </section>
      </main>
      <footer className={styles.footer}><Link href="/">All bank promos</Link><Link href="/guides">Guides</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-use">Terms</Link></footer>
    </div>
  );
}
