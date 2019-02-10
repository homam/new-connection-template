export type Payout = 75 | 65 | 55 | 45 | 35 | 0;
export type Terms = 60 | 90 | 120;
export type Payments = {
  payout: Payout;
  terms: Terms;
};

export const defaultPayments: Payments = {
  payout: 45,
  terms: 90
};
