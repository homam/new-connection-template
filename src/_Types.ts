import { IHash } from "./_Types.IHash";
import { TaggedUnionMember } from "typelevel-ts";
import { Billings, defaultBillings } from "./_Types.Billings";
import * as BILLINGS from "./_Types.Billings";
import { Flows, defaultFlow } from "./_Types.Flows";
import * as FLOWS from "./_Types.Billings";
import { Regulations, defaultRegulations } from "./_Types.Regulations";
import * as REGULATIONS from "./_Types.Regulations";
import { Payments, defaultPayments } from "./_Types.Payments";
import * as PAYMENTS from "./_Types.Payments";
import { Marketing, defaultMarketing } from "./_Types.Marketing";
import * as MARKETING from "./_Types.Payments";
export { BILLINGS, FLOWS, REGULATIONS, PAYMENTS, MARKETING };

export type OperatorMakretShare = 10 | 20 | 30 | 50 | 75 | 90 | 100;

export type Operator = {
  name: string;
  marketShare: OperatorMakretShare;
};

export type Service = {
  name: string;
};

export const defaultServices: Service[] = [{ name: "" }];

export type FormState = {
  country: null | string;
  gateway: string;
  operators: Array<Operator>;
  services: Array<Service>;
  flows: Flows;
  billings: Billings;
  regulations: Regulations;
  payments: Payments;
  marketing: Marketing;
};

export const defaultState: FormState = {
  country: null,
  gateway: "",
  operators: [{ name: "", marketShare: 10 }],
  services: [{ name: "Service 1" }],
  flows: { tag: "AllMNOsHaveTheSameFlow", value: defaultFlow },
  billings: defaultBillings,
  regulations: defaultRegulations,
  payments: defaultPayments,
  marketing: defaultMarketing
};
