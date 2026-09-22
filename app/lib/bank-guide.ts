import meta from "../data/meta.json" with { type: "json" };

export type BankGuide = {
  bank: string;
  slug: string;
  path: string;
  title: string;
  description: string;
};

function bankSlug(bank: string) {
  return bank.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function bankPagePath(bank: string) {
  return `/${bankSlug(bank)}-credit-card-promos-philippines`;
}

export const bankGuides: BankGuide[] = meta.banks.map((bank) => ({
  bank,
  slug: `${bankSlug(bank)}-credit-card-promos-philippines`,
  path: bankPagePath(bank),
  title: `${bank} Credit Card Promos Philippines | Current Offers`,
  description: `Compare current ${bank} credit card promos for dining, shopping, travel, installments, and more. Check offer dates, eligible cards, and official ${bank} terms.`,
}));

export function bankGuideForSlug(slug: string) {
  return bankGuides.find((guide) => guide.slug === slug);
}
