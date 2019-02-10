export type WelcomeMessage =
  | { tag: "ByUs" }
  | { tag: "ByGatewayOrMNO"; customizable: boolean }
  | { tag: "NotRequired" };
export type LandingPageApproval = "NotNeeded" | "OneWeek" | "MoreThanOneWeek";
export type MarketRegulationCondition = "Strict" | "Mild" | "Unregulated";
export type ServiceApproval =
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
  marketCondition: "Mild",
  landingPageApprival: "OneWeek",
  serviceApproval: { tag: "OK" },
  welcomeMessage: { tag: "ByGatewayOrMNO", customizable: false },
  reminderMessages: { tag: "NotRequired" },
  moreInfo: null
};
