"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Filter,
  Menu,
  Search,
  Tag,
  X,
} from "lucide-react";
import promoDataJson from "./data/promos.json";

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

const promoData = promoDataJson as Promo[];

const bankMarks: Record<string, string> = {
  BDO: "BDO",
  BPI: "BPI",
  BankCom: "BC",
  Chinabank: "CB",
  EastWest: "EW",
  Maybank: "MB",
  Metrobank: "M",
  RCBC: "RC",
  "Security Bank": "SB",
  UnionBank: "UB",
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

const today = new Date();
today.setHours(0, 0, 0, 0);

function formatDate(value: string | null) {
  if (!value) return "Check offer page";
  const normalized = value.slice(0, 10);
  const parsed = new Date(`${normalized}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getStatus(promo: Promo) {
  if (!promo.endDate) return "check" as const;
  const end = new Date(`${promo.endDate.slice(0, 10)}T00:00:00`);
  if (end < today) return "expired" as const;
  const days = Math.ceil((end.getTime() - today.getTime()) / 86400000);
  return days <= 30 ? "ending" as const : "active" as const;
}

function PromoImage({ promo }: { promo: Promo }) {
  const [failed, setFailed] = useState(false);

  if (!promo.imageUrl || failed) {
    return (
      <div className="promo-image-fallback" style={{ backgroundColor: bankColors[promo.bank] ?? "#2457d6" }}>
        <span>{bankMarks[promo.bank] ?? promo.bank.slice(0, 2)}</span>
      </div>
    );
  }

  return (
    // Scraped bank images come from multiple hosts, so the native element preserves their source URLs.
    <img
      className="promo-image"
      src={promo.imageUrl}
      alt=""
      loading="lazy"
      style={{ backgroundColor: bankColors[promo.bank] ?? "#2457d6" }}
      onError={() => setFailed(true)}
    />
  );
}

function BankMark({ bank }: { bank: string }) {
  return (
    <span className="bank-mark" style={{ color: bankColors[bank] ?? "#2457d6" }}>
      {bankMarks[bank] ?? bank.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("ending");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null);
  const [displayLimit, setDisplayLimit] = useState(40);

  const banks = useMemo(() => {
    const counts = new Map<string, number>();
    promoData.forEach((promo) => counts.set(promo.bank, (counts.get(promo.bank) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    promoData.forEach((promo) => promo.categories.forEach((category) => counts.set(category, (counts.get(category) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const filteredPromos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = promoData.filter((promo) => {
      const matchesQuery = !normalizedQuery || [promo.promo, promo.bank, promo.summary, promo.category, promo.cardTypes].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesBank = selectedBanks.length === 0 || selectedBanks.includes(promo.bank);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.some((category) => promo.categories.includes(category));
      const matchesStatus = statusFilter === "all" || getStatus(promo) === statusFilter;
      return matchesQuery && matchesBank && matchesCategory && matchesStatus;
    });

    return result.sort((a, b) => {
      if (sort === "newest") return (b.dateAdded ?? "").localeCompare(a.dateAdded ?? "");
      if (sort === "bank") return a.bank.localeCompare(b.bank) || a.promo.localeCompare(b.promo);
      if (sort === "title") return a.promo.localeCompare(b.promo);
      return (a.endDate ?? "9999-12-31").localeCompare(b.endDate ?? "9999-12-31");
    });
  }, [query, selectedBanks, selectedCategories, statusFilter, sort]);

  const toggleValue = (value: string, selected: string[], setter: (next: string[]) => void) => {
    setter(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
    setDisplayLimit(40);
  };

  const clearFilters = () => {
    setSelectedBanks([]);
    setSelectedCategories([]);
    setStatusFilter("all");
    setQuery("");
  };

  const activeFilterCount = selectedBanks.length + selectedCategories.length + (statusFilter === "all" ? 0 : 1);
  const visiblePromos = filteredPromos.slice(0, displayLimit);

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="#top" aria-label="Credit Card Promos home">
            <span className="brand-icon" aria-hidden="true"><span /></span>
            <span>CreditCardPromos.ph</span>
          </a>

          <form className="header-search" onSubmit={(event) => event.preventDefault()}>
            <Search size={21} strokeWidth={2.2} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search promos" aria-label="Search promos" />
            <button type="submit">Search</button>
          </form>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#top">Home</a>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </nav>
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
            <Menu size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#top" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#privacy" onClick={() => setMobileMenuOpen(false)}>Privacy</a>
            <a href="#terms" onClick={() => setMobileMenuOpen(false)}>Terms</a>
          </nav>
        )}
      </header>

      <div className="page-content" id="top">
        <section className="page-heading">
          <div>
            <p className="eyebrow">Updated from bank promo pages</p>
            <h1>All Promotions</h1>
            <p className="results-note">{filteredPromos.length.toLocaleString()} promotions across {banks.length} banks</p>
          </div>
          <button className={`filter-toggle ${filtersOpen ? "is-open" : ""}`} onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>
            <Filter size={20} />
            Filter Promotions
            {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
          </button>
        </section>

        <div className="content-search-row">
          <form className="content-search" onSubmit={(event) => event.preventDefault()}>
            <Search size={21} strokeWidth={2.2} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search promos" aria-label="Search all promotions" />
            <button type="submit">Search</button>
          </form>
          <label className="sort-control">
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort promotions">
              <option value="ending">Ending soon</option>
              <option value="newest">Recently added</option>
              <option value="bank">Bank</option>
              <option value="title">Promo name</option>
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </label>
        </div>

        {filtersOpen && (
          <section className="filter-panel" aria-label="Promotion filters">
            <div className="filter-group bank-filter-group">
              <div className="filter-group-heading"><h2>Banks</h2><span>{selectedBanks.length ? `${selectedBanks.length} selected` : "All banks"}</span></div>
              <div className="filter-options">
                {banks.map(([bank, count]) => (
                  <button key={bank} className={`bank-option ${selectedBanks.includes(bank) ? "selected" : ""}`} onClick={() => toggleValue(bank, selectedBanks, setSelectedBanks)} aria-pressed={selectedBanks.includes(bank)}>
                    <BankMark bank={bank} />
                    <span>{bank}</span>
                    <small>{count}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-group-heading"><h2>Categories</h2><span>{selectedCategories.length ? `${selectedCategories.length} selected` : "Most common"}</span></div>
              <div className="filter-options category-options">
                {categories.slice(0, 12).map(([category, count]) => (
                  <button key={category} className={`category-option ${selectedCategories.includes(category) ? "selected" : ""}`} onClick={() => toggleValue(category, selectedCategories, setSelectedCategories)} aria-pressed={selectedCategories.includes(category)}>
                    <Tag size={16} />
                    <span>{category}</span>
                    <small>{count}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group status-filter-group">
              <div className="filter-group-heading"><h2>Status</h2><span>Offer timing</span></div>
              <div className="status-options">
                {[['all', 'All'], ['active', 'Active'], ['ending', 'Ending soon'], ['expired', 'Expired']].map(([value, label]) => (
                  <button key={value} className={`status-option ${statusFilter === value ? "selected" : ""}`} onClick={() => setStatusFilter(value)} aria-pressed={statusFilter === value}>{label}</button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && <button className="clear-filters" onClick={clearFilters}><X size={15} /> Clear all filters</button>}
          </section>
        )}

        <div className="listing-toolbar">
          <p>Showing <strong>{visiblePromos.length.toLocaleString()}</strong> of <strong>{filteredPromos.length.toLocaleString()}</strong> promotions</p>
          <p className="last-checked">Last checked Sep 17, 2026</p>
        </div>

        {visiblePromos.length > 0 ? (
          <section className="promo-grid" aria-label="Promotion results">
            {visiblePromos.map((promo) => {
              const status = getStatus(promo);
              return (
                <article className={`promo-card ${status === "expired" ? "is-expired" : ""}`} key={promo.id}>
                  <button className="promo-card-button" onClick={() => setSelectedPromo(promo)} aria-label={`View ${promo.promo}`}>
                    <div className="promo-media">
                      <PromoImage promo={promo} />
                      <span className="promo-bank-badge"><BankMark bank={promo.bank} /><span>{promo.bank}</span></span>
                      {status === "ending" && <span className="ending-badge">Ending soon</span>}
                    </div>
                    <div className="promo-card-body">
                      <div className="tag-row">{promo.categories.slice(0, 2).map((category) => <span className="promo-tag" key={category}>{category}</span>)}</div>
                      <h2>{promo.promo || "Untitled promotion"}</h2>
                      <p>{promo.summary || "Open the offer page for the latest details."}</p>
                      <div className="promo-meta"><span><CalendarDays size={16} /> {promo.endDate ? `Valid until ${formatDate(promo.endDate)}` : "Check offer dates"}</span></div>
                      {promo.cardTypes && <div className="promo-meta"><span><Tag size={16} /> {promo.cardTypes}</span></div>}
                    </div>
                  </button>
                  <a className="offer-link" href={promo.offerUrl || "#"} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                    View offer <ExternalLink size={14} />
                  </a>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="empty-state"><Search size={26} /><h2>No promotions found</h2><p>Try a different search or clear your filters.</p><button onClick={clearFilters}>Clear filters</button></section>
        )}

        {displayLimit < filteredPromos.length && <button className="load-more" onClick={() => setDisplayLimit((limit) => limit + 40)}>Load more promotions</button>}
      </div>

      {selectedPromo && (
        <div className="drawer-backdrop" role="presentation" onClick={() => setSelectedPromo(null)}>
          <aside className="promo-drawer" role="dialog" aria-modal="true" aria-labelledby="promo-drawer-title" onClick={(event) => event.stopPropagation()}>
            <button className="drawer-close" onClick={() => setSelectedPromo(null)} aria-label="Close promotion details"><X size={22} /></button>
            <div className="drawer-media"><PromoImage promo={selectedPromo} /></div>
            <div className="drawer-content">
              <div className="tag-row">{selectedPromo.categories.map((category) => <span className="promo-tag" key={category}>{category}</span>)}</div>
              <div className="drawer-bank"><BankMark bank={selectedPromo.bank} /> {selectedPromo.bank}</div>
              <h2 id="promo-drawer-title">{selectedPromo.promo}</h2>
              <p className="drawer-summary">{selectedPromo.summary || "Open the offer page for the full promotion details."}</p>
              <dl className="detail-list">
                <div><dt><CalendarDays size={17} /> Dates</dt><dd>{selectedPromo.startDate ? `${formatDate(selectedPromo.startDate)} to ${formatDate(selectedPromo.endDate)}` : formatDate(selectedPromo.endDate)}</dd></div>
                <div><dt><Tag size={17} /> Eligible cards</dt><dd>{selectedPromo.cardTypes || "See offer page"}</dd></div>
                {selectedPromo.originalDateWording && <div><dt>Source wording</dt><dd>{selectedPromo.originalDateWording}</dd></div>}
              </dl>
              <a className="drawer-offer-link" href={selectedPromo.offerUrl || "#"} target="_blank" rel="noreferrer">Open original offer <ExternalLink size={17} /></a>
              <p className="drawer-note">Listing summary from the bank page. Confirm the full terms, eligible cards, and current availability with the bank.</p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
