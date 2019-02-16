export type UnionToObject<Keys extends string> = { [K in Keys]: K };
export type UnionToObject1<Keys extends string, V> = { [K in Keys]: V };

export type RiskLevel =
  | "Undefined"
  | "Any Affiliate"
  | "Trusted Affiliates"
  | "Media Buying";

export type TrafficTypes =
  | "Media Buying with Google"
  | "Media Buying with Facebook"
  | "POP Traffic"
  | "Push Traffic"
  | "In-App Flows"
  | "API Flows"
  | "Misleading Pre-Landers"
  | "Adult Traffic"
  | "Content-Locking"
  | "Auto-Subscription";

type Traffic = UnionToObject1<TrafficTypes, boolean>;

export type Marketing = { traffic: Traffic; riskLevel: RiskLevel };

export const defaultMarketing: Marketing = {
  traffic: {
    "Media Buying with Google": false,
    "Media Buying with Facebook": false,
    "POP Traffic": false,
    "Push Traffic": false,
    "In-App Flows": false,
    "API Flows": false,
    "Misleading Pre-Landers": false,
    "Adult Traffic": false,
    "Content-Locking": false,
    "Auto-Subscription": false
  },
  riskLevel: "Undefined"
};
