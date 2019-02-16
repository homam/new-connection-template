export type WelcomeMessage =
  | { tag: "Undefined" }
  | { tag: "ByUs" }
  | { tag: "ByGatewayOrMNO"; customizable: boolean }
  | { tag: "NotRequired" };
export type LandingPageApproval =
  | "Undefined"
  | "NotNeeded"
  | "OneWeek"
  | "MoreThanOneWeek";
export type MarketRegulationCondition =
  | "Undefined"
  | "Strict"
  | "Mild"
  | "Unregulated";
export type ServiceApproval =
  | { tag: "Undefined" }
  | { tag: "OK" }
  | { tag: "Difficult"; value: string };
export type Regulations = {
  marketCondition: MarketRegulationCondition;
  welcomeMessage: WelcomeMessage;
  reminderMessages: WelcomeMessage;
  serviceApproval: ServiceApproval;
  landingPageApprival: LandingPageApproval;
  moreInfo: string | null;
};
export const defaultRegulations: Regulations = {
  marketCondition: "Undefined",
  landingPageApprival: "Undefined",
  serviceApproval: { tag: "Undefined" },
  welcomeMessage: { tag: "Undefined" },
  reminderMessages: { tag: "Undefined" },
  moreInfo: null
};
