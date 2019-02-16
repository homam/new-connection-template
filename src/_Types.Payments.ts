export type Payout = "Undefined" | 75 | 65 | 55 | 45 | 35 | 0;
export type Terms = "Undefined" | 60 | 90 | 120;
export type Payments = {
  payout: Payout;
  terms: Terms;
};

export const defaultPayments: Payments = {
  payout: "Undefined",
  terms: "Undefined"
};
