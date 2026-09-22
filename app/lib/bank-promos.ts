export type BankPromo = {
  id: string;
  bank: string;
  promo: string;
  categories: string[];
  summary: string;
  startDate: string | null;
  endDate: string | null;
  dateCheck: string;
  cardTypes: string;
  offerUrl: string;
  imageUrl: string;
  dateAdded: string | null;
};

export function manilaDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
}

function calendarDate(value: string | null) {
  const day = value?.slice(0, 10);
  if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return null;
  const parsed = new Date(`${day}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day ? day : null;
}

export function promoStatus(promo: BankPromo, today: string) {
  const end = calendarDate(promo.endDate);
  const start = calendarDate(promo.startDate);
  if (end && end < today) return "expired";
  if (start && start > today) return "upcoming";
  if (!end || promo.dateCheck !== "End date not passed") return "check";
  return "current";
}

export function formatPromoDate(value: string | null, bank = "the bank") {
  const day = calendarDate(value);
  if (!day) return `Confirm dates with ${bank}`;
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "UTC", month: "short", day: "numeric", year: "numeric",
  }).format(new Date(`${day}T00:00:00Z`));
}

export function bankDirectoryUrl(bank: string, category?: string) {
  const params = new URLSearchParams({ bank });
  if (category) params.set("category", category);
  return `/?${params.toString()}#top`;
}

export function bankPromosForPage(promos: BankPromo[], bank: string, today: string) {
  return currentPromosForPage(promos.filter((promo) => promo.bank === bank), today);
}

export function currentPromosForPage(promos: BankPromo[], today: string) {
  const seen = new Set<string>();
  return promos.filter((promo) => {
    const cardTypes = promo.cardTypes.toLowerCase();
    const hasDebitOnlyLabel = cardTypes.includes("debit")
      && !/(credit|visa|mastercard|jcb|unionpay|american express|amex)/.test(cardTypes);
    if (hasDebitOnlyLabel) return false;
    const status = promoStatus(promo, today);
    if (status === "expired" || status === "upcoming") return false;
    const key = promo.offerUrl || promo.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort((a, b) => {
    const uncertain = Number(promoStatus(a, today) === "check") - Number(promoStatus(b, today) === "check");
    return uncertain || (b.dateAdded ?? "").localeCompare(a.dateAdded ?? "")
      || (a.endDate ?? "9999-12-31").localeCompare(b.endDate ?? "9999-12-31")
      || a.id.localeCompare(b.id);
  });
}

export function selectCategoryPromos<T extends { category: string }>(promos: BankPromo[], categories: T[], limit = 3) {
  const shown = new Set<string>();
  return categories.flatMap((category) => {
    const matches = promos.filter((promo) => promo.categories.includes(category.category));
    if (!matches.length) return [];
    // Keep overlapping category tags without repeating cards down the page.
    const cards = matches.filter((promo) => !shown.has(promo.offerUrl || promo.id)).slice(0, limit);
    cards.forEach((promo) => shown.add(promo.offerUrl || promo.id));
    return [{ ...category, count: matches.length, cards }];
  });
}
