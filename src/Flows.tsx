import * as React from "react";
import {
  Flows,
  Flow,
  FlowHosting,
  ConsentPageCustomizability,
  defaultFlow,
  IHash
} from "./_Types.Flows";
import { lookup, fromFoldable } from "fp-ts/lib/StrMap";
import Field from "./Field";

function FlowsDescription({
  flow,
  onChange
}: {
  flow: Flow;
  onChange: (flow: Flow) => void;
}) {
  return (
    <div>
      <section>
        <select
          value={flow.hosting.tag}
          onChange={ev =>
            onChange({
              ...flow,
              hosting:
                ev.target.value == "FullyHostedByUs"
                  ? { tag: ev.target.value }
                  : ({
                      tag: ev.target.value,
                      value:
                        flow.hosting.tag != "FullyHostedByUs"
                          ? flow.hosting.value
                          : "NotAtAll"
                    } as FlowHosting)
            })
          }
        >
          <option value="FullyHostedByUs">Fully hosted by us</option>
          <option value="PartiallyHostedByUs">Partially hosted by us</option>
          <option value="FullyHostedByGateway">Fully hosted by Gateway</option>
          <option value="FullyHostedByMNO">Fully hosted by MNO</option>
          <option value="HostedByGatewayAndMNO">
            Partially hosted by Gateway and partially by MNO
          </option>
        </select>
      </section>
      {!!flow && flow.hosting.tag != "FullyHostedByUs" ? (
        <div className="indent-1">
          <select
            value={flow.hosting.value}
            onChange={ev =>
              onChange({
                ...flow,
                hosting: {
                  ...flow.hosting,
                  value: ev.target.value as ConsentPageCustomizability
                } as FlowHosting
              })
            }
          >
            <option value="NotAtAll">
              Consent page is not customizable (like Axiata)
            </option>
            <option value="StaticImage">
              Consent page is customizable by static images (like Vodacom ZA)
            </option>
            <option value="DynamicImage">
              Consent page is customizable by dynamic images (like Qatar)
            </option>
            <option value="HTMLTemplate">
              Consent page is customizable by HTML templates (like KSA)
            </option>
          </select>
        </div>
      ) : null}
      <section>
        <div>
          <label>
            <input
              type="checkbox"
              checked={!!flow.flowTypes.PIN}
              onChange={ev =>
                onChange({
                  ...flow,
                  flowTypes: {
                    ...flow.flowTypes,
                    PIN: ev.target.checked
                      ? { tag: "PIN", value: "WeSendThePIN" }
                      : null
                  }
                })
              }
            />
            PIN&nbsp;
          </label>
          {!!flow.flowTypes.PIN ? (
            <div className="indent-1">
              <select
                value={flow.flowTypes.PIN.value}
                onChange={ev =>
                  onChange({
                    ...flow,
                    flowTypes: {
                      ...flow.flowTypes,
                      PIN: {
                        ...flow.flowTypes.PIN,
                        value: ev.target.value as
                          | "WeSendThePIN"
                          | "AnotherPartySendsThePIN"
                      }
                    }
                  })
                }
              >
                <option value="WeSendThePIN">
                  We generate and send the PIN
                </option>
                <option value="AnotherPartySendsThePIN">
                  Gateway / MNO generates and sends the PIN
                </option>
              </select>
            </div>
          ) : null}
        </div>
        <div>
          <label>
            <input
              checked={!!flow.flowTypes.MO}
              type="checkbox"
              onChange={ev =>
                onChange({
                  ...flow,
                  flowTypes: {
                    ...flow.flowTypes,
                    MO: ev.target.checked ? { tag: "MO" } : null
                  }
                })
              }
            />
            MO
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={!!flow.flowTypes.Click2SMS}
              onChange={ev =>
                onChange({
                  ...flow,
                  flowTypes: {
                    ...flow.flowTypes,
                    Click2SMS: ev.target.checked ? { tag: "Click2SMS" } : null
                  }
                })
              }
            />
            Click2SMS
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={!!flow.flowTypes.OneOrTwoClick}
              onChange={ev =>
                onChange({
                  ...flow,
                  flowTypes: {
                    ...flow.flowTypes,
                    OneOrTwoClick: ev.target.checked
                      ? { tag: "OneOrTwoClick", value: "ByHeaderEnrichment" }
                      : null
                  }
                })
              }
            />
            One or two click flow (3G)
          </label>
          &nbsp;
          {!!flow.flowTypes.OneOrTwoClick ? (
            <div className="indent-1">
              <select
                value={flow.flowTypes.OneOrTwoClick.value}
                onChange={ev =>
                  onChange({
                    ...flow,
                    flowTypes: {
                      ...flow.flowTypes,
                      OneOrTwoClick: {
                        ...flow.flowTypes.OneOrTwoClick,
                        value: ev.target.value as
                          | "ByHeaderEnrichment"
                          | "ByRedirection"
                      }
                    }
                  })
                }
              >
                <option value="ByHeaderEnrichment">
                  By Header Enrichment (like IRAQCOM)
                </option>
                <option value="ByRedirection">
                  By Redirection (like O8 in UK)
                </option>
              </select>
            </div>
          ) : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={!!flow.flowTypes.Complicated}
              onChange={ev =>
                onChange({
                  ...flow,
                  flowTypes: {
                    ...flow.flowTypes,
                    Complicated: ev.target.checked
                      ? { tag: "Complicated", value: "" }
                      : null
                  }
                })
              }
            />
            It's complicated:&nbsp;
          </label>
          {!!flow.flowTypes.Complicated ? (
            <div className="indent-1">
              <textarea
                cols={80}
                rows={3}
                value={flow.flowTypes.Complicated.value}
                onChange={ev =>
                  onChange({
                    ...flow,
                    flowTypes: {
                      ...flow.flowTypes,
                      Complicated: {
                        ...flow.flowTypes.Complicated,
                        value: ev.target.value
                      }
                    }
                  })
                }
              />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default function FlowsComponent({
  flows,
  setFlows,
  operators
}: {
  flows: Flows;
  setFlows: (flows: Flows) => void;
  operators: string[];
}) {
  return (
    <fieldset>
      <legend>Flows</legend>
      <section>
        <label>
          <input
            checked={flows.tag == "AllMNOsHaveTheSameFlow"}
            onChange={ev =>
              ev.target.checked
                ? setFlows({
                    tag: "AllMNOsHaveTheSameFlow",
                    value:
                      flows.tag == "SomeMNOsHaveDifferentFlows"
                        ? flows.value[operators[0]] || defaultFlow
                        : defaultFlow
                  })
                : null
            }
            name="mno_flows"
            type="radio"
          />
          All MNOs have the same flow
        </label>
        <label className="space-left">
          <input
            checked={flows.tag == "SomeMNOsHaveDifferentFlows"}
            onChange={ev =>
              ev.target.checked
                ? setFlows({
                    tag: "SomeMNOsHaveDifferentFlows",
                    value: operators
                      .map(o => ({
                        [o]:
                          flows.tag == "AllMNOsHaveTheSameFlow"
                            ? flows.value
                            : defaultFlow
                      }))
                      .reduce((acc, a) => ({ ...acc, ...a }), {}) as IHash<Flow>
                  })
                : null
            }
            name="mno_flows"
            type="radio"
          />
          Some MNOs have different flows
        </label>
      </section>
      {flows.tag == "AllMNOsHaveTheSameFlow" ? (
        <FlowsDescription
          flow={flows.value}
          onChange={value => setFlows({ tag: "AllMNOsHaveTheSameFlow", value })}
        />
      ) : (
        operators.map(o => (
          <section key={o}>
            <h3>{o}</h3>
            <FlowsDescription
              flow={(flows.value || {})[o] || defaultFlow}
              onChange={flow =>
                setFlows({
                  tag: "SomeMNOsHaveDifferentFlows",
                  value: { ...(flows.value || {}), [o]: flow }
                })
              }
            />
          </section>
        ))
      )}
    </fieldset>
  );
}
