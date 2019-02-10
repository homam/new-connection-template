import { IHash } from "./_Types.IHash";
import { TaggedUnionMember } from "typelevel-ts";
export { IHash };

export type ConsentPageCustomizability =
  | "NotAtAll"
  | "StaticImage"
  | "DynamicImage"
  | "HTMLTemplate";
export type FlowHosting =
  | { tag: "FullyHostedByUs" }
  | { tag: "PartiallyHostedByUs"; value: ConsentPageCustomizability }
  | { tag: "FullyHostedByGateway"; value: ConsentPageCustomizability }
  | { tag: "FullyHostedByMNO"; value: ConsentPageCustomizability }
  | { tag: "HostedByGatewayAndMNO"; value: ConsentPageCustomizability };
export type FlowType =
  | { tag: "PIN"; value: "WeSendThePIN" | "AnotherPartySendsThePIN" }
  | { tag: "MO" }
  | { tag: "Click2SMS" }
  | { tag: "OneOrTwoClick"; value: "ByHeaderEnrichment" | "ByRedirection" }
  | { tag: "Complicated"; value: string };

export type Flow = {
  hosting: FlowHosting;
  flowTypes: {
    PIN?: TaggedUnionMember<FlowType, "tag", "PIN">;
    MO?: TaggedUnionMember<FlowType, "tag", "MO">;
    Click2SMS?: TaggedUnionMember<FlowType, "tag", "Click2SMS">;
    OneOrTwoClick?: TaggedUnionMember<FlowType, "tag", "OneOrTwoClick">;
    Complicated?: TaggedUnionMember<FlowType, "tag", "Complicated">;
  };
};

export type Flows =
  | { tag: "AllMNOsHaveTheSameFlow"; value: Flow }
  | { tag: "SomeMNOsHaveDifferentFlows"; value: IHash<Flow> };

export const defaultFlow: Flow = {
  flowTypes: {},
  hosting: { tag: "FullyHostedByUs" }
};
