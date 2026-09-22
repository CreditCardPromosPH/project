import assert from "node:assert/strict";
import test from "node:test";
import { bankDirectoryUrl, bankPromosForPage, manilaDate, promoStatus, selectCategoryPromos } from "../app/lib/bank-promos.ts";

const today = "2026-09-22";
const promo = {
  id: "one", bank: "BDO", promo: "Test offer", summary: "", categories: ["Dining"],
  startDate: null, endDate: today, dateCheck: "End date not passed", cardTypes: "Credit cards",
  offerUrl: "https://www.deals.bdo.com.ph/deal-welcome/1", imageUrl: "", dateAdded: "2026-09-20",
};

test("expiry is inclusive; past and upcoming offers are excluded", () => {
  assert.equal(promoStatus(promo, today), "current");
  assert.equal(promoStatus({ ...promo, endDate: "2026-09-21" }, today), "expired");
  assert.equal(promoStatus({ ...promo, startDate: "2026-09-23", endDate: "2026-10-01" }, today), "upcoming");
  assert.equal(bankPromosForPage([{ ...promo, endDate: "2026-09-21" }], "BDO", today).length, 0);
  assert.equal(bankPromosForPage([{ ...promo, startDate: "2026-09-23", endDate: "2026-10-01" }], "BDO", today).length, 0);
});

test("uncertain and invalid dates are never presented as confirmed dates", () => {
  for (const endDate of [null, "not-a-date", "2026-02-30"]) {
    assert.equal(promoStatus({ ...promo, endDate }, today), "check");
  }
  assert.equal(promoStatus({ ...promo, dateCheck: "Check dates" }, today), "check");
  assert.equal(bankPromosForPage([{ ...promo, endDate: null }], "BDO", today).length, 1);
});

test("calendar dates follow Philippine time across the UTC day boundary", () => {
  assert.equal(manilaDate(new Date("2026-09-21T16:00:00Z")), today);
  assert.equal(manilaDate(new Date("2026-09-22T15:59:59Z")), today);
});

test("bank selection excludes debit-only records and duplicate source URLs", () => {
  const results = bankPromosForPage([
    promo, { ...promo, id: "duplicate" }, { ...promo, bank: "BPI" },
    { ...promo, id: "debit", offerUrl: "https://www.deals.bdo.com.ph/deal-welcome/2", cardTypes: "Debit cards" },
    { ...promo, id: "mixed", offerUrl: "https://www.deals.bdo.com.ph/deal-welcome/3", cardTypes: "Credit cards; Debit cards" },
  ], "BDO", today);
  assert.deepEqual(results.map((p) => p.id).sort(), ["mixed", "one"]);
});

test("category counts can overlap while cards do not repeat; empty categories disappear", () => {
  const sections = selectCategoryPromos([
    { ...promo, categories: ["Dining", "Shopping"] },
    { ...promo, id: "two", offerUrl: "https://www.deals.bdo.com.ph/deal-welcome/2", categories: ["Shopping"] },
  ], [{ category: "Dining" }, { category: "Shopping" }, { category: "Travel" }]);
  assert.deepEqual(sections.map((s) => s.count), [1, 2]);
  assert.deepEqual(sections.flatMap((s) => s.cards.map((p) => p.id)), ["one", "two"]);
  assert.equal(selectCategoryPromos([], [{ category: "Dining" }]).length, 0);
});

test("view-all links preserve both directory filters", () => {
  const link = new URL(bankDirectoryUrl("BDO", "Installments & Financing"), "https://www.creditcardpromos.ph");
  assert.equal(link.searchParams.get("bank"), "BDO");
  assert.equal(link.searchParams.get("category"), "Installments & Financing");
  assert.equal(link.hash, "#top");
});
