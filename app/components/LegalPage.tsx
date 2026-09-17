import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const updatedDate = "September 18, 2026";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="legal-shell">
      <header className="site-header legal-header">
        <div className="site-header-inner">
          <Link className="brand" href="/" aria-label="Credit Card Promos home">
            <img className="brand-logo" src="/logo.svg" alt="" width="720" height="180" />
          </Link>
          <Link className="legal-back-link" href="/"><ArrowLeft size={17} /> Back to promos</Link>
        </div>
      </header>

      <article className="legal-page">
        <p className="eyebrow">CreditCardPromos.ph</p>
        <h1>{title}</h1>
        <p className="legal-updated">Last updated: {updatedDate}</p>
        <div className="legal-copy">{children}</div>
        <nav className="legal-related" aria-label="Legal pages">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
        </nav>
      </article>
    </main>
  );
}
