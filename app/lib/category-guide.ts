export type CategoryGuide = {
  category: string;
  slug: string;
  path: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  checklist: Array<{ title: string; body: string }>;
  questions: Array<{ question: string; answer: string }>;
};

const definitions: Array<Omit<CategoryGuide, "slug" | "path"> & { slugBase: string }> = [
  {
    category: "Travel & Leisure",
    slugBase: "travel",
    label: "Travel",
    title: "Travel Credit Card Promos Philippines | Current Offers",
    description: "Compare current Philippine credit card travel promos for flights, hotels, resorts, and bookings. Check eligible cards, dates, blackout periods, and official terms.",
    intro: "Find current travel credit card promos from Philippine banks, including hotel discounts, airline offers, resorts, dining during travel, and travel-booking deals. Compare the bank, eligible card, booking period, travel period, and redemption requirements before you pay.",
    checklist: [
      { title: "Separate booking and travel dates", body: "A booking deadline may be earlier than the date you can fly or stay. Check both periods, blackout dates, minimum stays, and availability restrictions." },
      { title: "Compare the total trip cost", body: "A percentage discount may have a cap, minimum spend, or excluded fees. Compare the final price after taxes, service charges, baggage, and other add-ons." },
      { title: "Confirm the booking channel", body: "Some offers require a bank landing page, promo code, designated agency, or direct merchant booking. A normal checkout may not trigger the benefit." },
      { title: "Check the eligible card", body: "Travel benefits can be limited to a network, tier, or premium card. Confirm the card name and whether supplementary cards qualify." },
    ],
    questions: [
      { question: "What travel credit card promos are available in the Philippines?", answer: "This page tracks current Philippine bank-card offers for hotels, airlines, resorts, travel agencies, booking platforms, and related travel spending. Check each listing's dates and official terms before booking." },
      { question: "Do travel credit card promos require a promo code?", answer: "Some offers apply automatically, while others require a promo code, registration, or a designated booking link. The official bank or merchant terms determine the redemption process." },
      { question: "What is the difference between booking dates and travel dates?", answer: "The booking period is when you must make the reservation or purchase. The travel period is when the flight, hotel stay, or activity must take place. Both can have separate restrictions." },
    ],
  },
  {
    category: "Dining",
    slugBase: "dining",
    label: "Dining",
    title: "Dining Credit Card Promos Philippines | Current Offers",
    description: "Compare current dining credit card promos in the Philippines, including restaurant discounts, hotel dining, buffets, and spend-based offers.",
    intro: "Browse current dining credit card promos from Philippine banks, including restaurant discounts, hotel dining, buffets, cafes, and spend-based rebates. Compare the eligible card, minimum bill, discount cap, dining period, and participating locations.",
    checklist: [
      { title: "Check the minimum spend", body: "A dining discount may require a minimum bill, a single receipt, or a specific number of diners. Confirm whether service charges and taxes count toward the requirement." },
      { title: "Review the discount cap", body: "The headline percentage may be limited to a maximum peso amount. Compare the actual saving at your expected bill size." },
      { title: "Confirm participating branches", body: "Restaurant promotions may exclude certain branches, hotel outlets, holidays, or special events. Check the participating-location list before visiting." },
      { title: "Check payment and registration rules", body: "Some offers require full payment with one eligible card, advance reservation, or registration. Splitting the bill may affect eligibility." },
    ],
    questions: [
      { question: "What dining credit card promos are currently available?", answer: "This page tracks current restaurant, hotel dining, buffet, cafe, and food-related card promotions from Philippine banks. Confirm the participating merchant and full mechanics on the official offer page." },
      { question: "Do dining promos apply to all cards from a bank?", answer: "Not always. Dining offers can be limited to a network, tier, card product, or supplementary-card rule. Check the exact eligible card before ordering." },
      { question: "Can I combine a dining promo with another discount?", answer: "Many offers cannot be combined with other discounts, vouchers, or ongoing promotions. Check the exclusions and payment rules in the official terms." },
    ],
  },
  {
    category: "Installments & Financing",
    slugBase: "installment",
    label: "Installments",
    title: "Installment Credit Card Promos Philippines | Current Offers",
    description: "Compare current credit card installment promos in the Philippines for gadgets, appliances, furniture, tuition, and other planned purchases.",
    intro: "Compare current Philippine credit card installment promos for gadgets, appliances, furniture, tuition, and other larger purchases. Review the merchant, card eligibility, installment term, minimum purchase, total amount payable, and payment schedule.",
    checklist: [
      { title: "Compare the total amount payable", body: "A low monthly payment can hide fees or a higher total cost. Compare the full installment price with the cash price and other available financing options." },
      { title: "Check the available term", body: "Confirm whether the advertised rate applies to every term or only a selected number of months. Longer terms may have different rates or eligibility rules." },
      { title: "Confirm the purchase channel", body: "Some offers work only at participating branches, online stores, merchant terminals, or designated checkout pages. Keep the receipt and installment confirmation." },
      { title: "Understand early-payment rules", body: "Ask the bank about pre-termination, fees, posting, and how the installment appears on your statement before committing to a purchase." },
    ],
    questions: [
      { question: "What installment credit card promos are available in the Philippines?", answer: "This page tracks current installment and financing offers for electronics, appliances, furniture, tuition, and other purchases. Check the official mechanics for the exact rate, term, and eligible card." },
      { question: "Are 0% installment promos always cheaper?", answer: "Not necessarily. Confirm the cash price, fees, minimum purchase, and whether the merchant gives the same base price without financing. Compare the total amount payable." },
      { question: "Do installment promos affect my available credit limit?", answer: "Installment purchases commonly reduce available credit by the purchase amount and restore it as payments are made, but the bank's terms control. Confirm the treatment before transacting." },
    ],
  },
  {
    category: "Shopping",
    slugBase: "shopping",
    label: "Shopping",
    title: "Shopping Credit Card Promos Philippines | Current Offers",
    description: "Compare current shopping credit card promos in the Philippines, including retail discounts, electronics offers, eGCs, and spend-based rewards.",
    intro: "Find current shopping credit card promos from Philippine banks for retail stores, electronics, department stores, fashion, and online or in-store purchases. Compare the discount, minimum spend, eligible card, participating merchant, and redemption steps.",
    checklist: [
      { title: "Check regular and sale-item rules", body: "Some shopping offers apply only to regular-priced items, selected brands, or full-priced merchandise. Read the exclusions before relying on the discount." },
      { title: "Compare the real reward value", body: "An eGC, cashback reward, or percentage discount may have different restrictions and expiry dates. Compare what you can actually use, not only the headline amount." },
      { title: "Confirm the checkout method", body: "Online and in-store offers may use different promo codes, payment pages, terminals, or registration steps. Follow the official instructions exactly." },
      { title: "Review the spend requirement", body: "Check whether the minimum spend is per receipt, per day, or accumulated, and whether shipping, taxes, gift cards, or installment purchases are excluded." },
    ],
    questions: [
      { question: "What shopping credit card promos are currently available?", answer: "This page tracks current retail, electronics, department store, fashion, and shopping-reward offers from Philippine banks. Each listing links to the official terms for final eligibility and exclusions." },
      { question: "Do shopping promos work for online purchases?", answer: "Some offers are online-only, some are in-store-only, and others support both channels. Check the required checkout link, promo code, merchant site, and payment method." },
      { question: "How do I compare shopping discounts and eGC rewards?", answer: "Compare the minimum spend, maximum benefit, qualifying items, redemption timing, expiry, and whether the reward can be used for purchases you already plan to make." },
    ],
  },
];

export const categoryGuides: CategoryGuide[] = definitions.map(({ slugBase, ...guide }) => ({
  ...guide,
  slug: `${slugBase}-credit-card-promos-philippines`,
  path: `/${slugBase}-credit-card-promos-philippines`,
}));

export function categoryGuideForSlug(slug: string) {
  return categoryGuides.find((guide) => guide.slug === slug);
}
