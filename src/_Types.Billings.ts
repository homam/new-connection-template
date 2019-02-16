import { IHash } from "./_Types.IHash";
export { IHash };

export type MandatedBillingTariffLevel =
  | "MarketStandard"
  | "Premium"
  | "LowerThanCompetitors";
export type BillingNotifications = {
  realTimeOrDelayed: "Undefined" | "RealTime" | "Delayed";
  visibility:
    | "Undefined"
    | "SuccessOnly"
    | "BothSuccessFailure"
    | "NoUsefulNotofications";
};
export type BillingsManagement =
  | { tag: "Undefined" }
  | { tag: "FullyByUs" }
  | { tag: "ByGatewayOrMNO"; value: BillingNotifications };
export type BillingFrequency =
  | "Undefined"
  | "OneOff"
  | "Daily"
  | "FewTimesAWeek"
  | "Weekly"
  | "Monthly";
export type Tariff = {
  amount:
    | { tag: "Undefined" }
    | { tag: "UpToUs" }
    | {
        tag: "Mandated";
        value: { level: MandatedBillingTariffLevel; amount: string };
      };
  frequency: BillingFrequency;
  retry:
    | { tag: "Undefined" }
    | { tag: false }
    | { tag: true; scaleDown: boolean };
};
export type Tariffs =
  | { tag: "Undefined" }
  | { tag: "AllServicesHaveSimilarTariffs"; value: Tariff }
  | {
      tag: "SomeServicesHaveDifferentTariffs";
      value: IHash<Tariff>;
    };

export const defaultTariff: Tariff = {
  frequency: "Undefined",
  amount: {
    tag: "Undefined"
    // value: { level: "MarketStandard", amount: "... USD" }
  },
  retry: { tag: "Undefined" }
};

export const defaultTariffs: Tariffs = {
  tag: "Undefined"
};

export type MNOTariffs =
  | { tag: "Undefined" }
  | { tag: "AllMNOsHaveSimilarTariffs"; value: Tariffs }
  | { tag: "SomeMNOsHaveDifferentTariffs"; value: IHash<Tariffs> };

export type Billings = {
  basics: {
    management: BillingsManagement;
    billingType: "Undefined" | "PSMS" | "DCB";
  };
  tariffs: MNOTariffs;
};

export const defaultBasicsManagement: BillingsManagement = {
  tag: "Undefined"
};

export const defaultBillings: Billings = {
  basics: {
    billingType: "Undefined",
    management: defaultBasicsManagement
  },
  tariffs: { tag: "Undefined" }
};
