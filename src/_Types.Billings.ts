import { IHash } from "./_Types.IHash";
export { IHash };

export type MandatedBillingTariffLevel =
  | "MarketStandard"
  | "Premium"
  | "LowerThanCompetitors";
export type BillingNotifications = {
  realTimeOrDelayed: "RealTime" | "Delayed";
  visibility: "SuccessOnly" | "BothSuccessFailure" | "NoUsefulNotofications";
};
export type BillingsManagement =
  | { tag: "FullyByUs" }
  | { tag: "ByGatewayOrMNO"; value: BillingNotifications };
export type BillingFrequency =
  | "OneOff"
  | "Daily"
  | "FewTimesAWeek"
  | "Weekly"
  | "Monthly";
export type Tariff = {
  amount:
    | { tag: "UpToUs" }
    | {
        tag: "Mandated";
        value: { level: MandatedBillingTariffLevel; amount: string };
      };
  frequency: BillingFrequency;
  retry: { tag: false } | { tag: true; scaleDown: boolean };
};
export type Tariffs =
  | { tag: "AllServicesHaveSimilarTariffs"; value: Tariff }
  | {
      tag: "SomeServicesHaveDifferentTariffs";
      value: IHash<Tariff>;
    };

export const defaultTariff: Tariff = {
  frequency: "Daily",
  amount: {
    tag: "Mandated",
    value: { level: "MarketStandard", amount: "... USD" }
  },
  retry: { tag: true, scaleDown: false }
};

export const defaultTariffs: Tariffs = {
  tag: "AllServicesHaveSimilarTariffs",
  value: defaultTariff
};

export type MNOTariffs =
  | { tag: "AllMNOsHaveSimilarTariffs"; value: Tariffs }
  | { tag: "SomeMNOsHaveDifferentTariffs"; value: IHash<Tariffs> };

export type Billings = {
  basics: {
    management: BillingsManagement;
    billingType: "PSMS" | "DCB";
  };
  tariffs: MNOTariffs;
};

export const defaultBasicsManagedByGateway: BillingsManagement = {
  tag: "ByGatewayOrMNO",
  value: { realTimeOrDelayed: "RealTime", visibility: "SuccessOnly" }
};

export const defaultBillings: Billings = {
  basics: {
    billingType: "DCB",
    management: defaultBasicsManagedByGateway
  },
  tariffs: { tag: "AllMNOsHaveSimilarTariffs", value: defaultTariffs }
};
