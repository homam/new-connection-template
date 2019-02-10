import { IHash } from "./_Types.IHash";
import { TaggedUnionMember } from "typelevel-ts";
import { Billings, defaultBillings } from "./_Types.Billings";
import * as BILLINGS from "./_Types.Billings";
import { Flows, defaultFlow } from "./_Types.Flows";
import * as FLOWS from "./_Types.Billings";
export { BILLINGS, FLOWS };

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
  // country: string;
  // gateway: string;
  operators: Array<Operator>;
  services: Array<Service>;
  flows: Flows;
  billings: Billings;
};

export const defaultState: FormState = {
  operators: [{ name: "", marketShare: 10 }],
  services: [{ name: "Service 1" }],
  flows: { tag: "AllMNOsHaveTheSameFlow", value: defaultFlow },
  billings: defaultBillings
};
