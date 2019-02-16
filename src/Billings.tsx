import * as React from "react";
import { IHash, Billings } from "./_Types.Billings";
import Field from "./Field";
import MNOTariffs from "./Billings.MNOTariffs";

type IBillingProps = {
  billings: Billings;
  setBillings: (billings: Billings) => void;
};

export default function BillingsComponent({
  billings,
  setBillings,
  operators,
  services
}: IBillingProps & {
  operators: string[];
  services: string[];
}) {
  return (
    <fieldset>
      <legend>Billings</legend>
      <BillingMnagementComponent
        billings={billings}
        setBillings={setBillings}
      />
      <BillingTypesComponent billings={billings} setBillings={setBillings} />
      <MNOTariffs
        tariffs={billings.tariffs}
        operators={operators}
        services={services}
        onChange={tariffs =>
          setBillings({
            ...billings,
            tariffs
          })
        }
      />
    </fieldset>
  );
}

function BillingTypesComponent({ billings, setBillings }: IBillingProps) {
  return (
    <section>
      <div>
        <label>
          <input
            type="radio"
            checked={billings.basics.billingType == "PSMS"}
            onChange={ev =>
              ev.target.checked
                ? setBillings({
                    ...billings,
                    basics: {
                      ...billings.basics,
                      billingType: "PSMS"
                    }
                  })
                : null
            }
          />
          PSMS (user receives billing MTs or gets notified about each billing)
        </label>
      </div>
      <div className="space-top">
        <label>
          <input
            type="radio"
            checked={billings.basics.billingType == "DCB"}
            onChange={ev =>
              ev.target.checked
                ? setBillings({
                    ...billings,
                    basics: {
                      ...billings.basics,
                      billingType: "DCB"
                    }
                  })
                : null
            }
          />
          DCB (silent from the end-user pont-of-view)
        </label>
      </div>
    </section>
  );
}

function BillingMnagementComponent({ billings, setBillings }: IBillingProps) {
  return (
    <section>
      <div>
        <label>
          <input
            type="radio"
            checked={billings.basics.management.tag == "FullyByUs"}
            onChange={ev =>
              ev.target.checked
                ? setBillings({
                    ...billings,
                    basics: {
                      ...billings.basics,
                      management: { tag: "FullyByUs" }
                    }
                  })
                : null
            }
          />
          Billings are fully managed by us
        </label>
      </div>
      <div className="space-top">
        <label>
          <input
            type="radio"
            checked={billings.basics.management.tag == "ByGatewayOrMNO"}
            onChange={ev =>
              ev.target.checked
                ? setBillings({
                    ...billings,
                    basics: {
                      ...billings.basics,
                      management: {
                        tag: "ByGatewayOrMNO",
                        value: {
                          realTimeOrDelayed: "Undefined",
                          visibility: "Undefined"
                        }
                      }
                    }
                  })
                : null
            }
          />
          Billings are managed by Gateway or MNO
        </label>
      </div>
      {billings.basics.management.tag == "ByGatewayOrMNO" ? (
        <div className="indent-1">
          <div>
            <select
              onChange={ev =>
                setBillings({
                  ...billings,
                  basics: {
                    ...billings.basics,
                    management: {
                      tag: "ByGatewayOrMNO",
                      value: {
                        visibility:
                          billings.basics.management.tag == "ByGatewayOrMNO"
                            ? billings.basics.management.value.visibility
                            : "SuccessOnly",
                        realTimeOrDelayed: ev.target.value as
                          | "RealTime"
                          | "Delayed"
                          | "Undefined"
                      }
                    }
                  }
                })
              }
              value={billings.basics.management.value.realTimeOrDelayed}
            >
              <option value="Undefined">-</option>
              <option value="RealTime">We have Real-Time Notifications</option>
              <option value="Delayed">We have Delayed Notifications</option>
            </select>
          </div>
          <div className="space-top">
            <select
              onChange={ev =>
                setBillings({
                  ...billings,
                  basics: {
                    ...billings.basics,
                    management: {
                      tag: "ByGatewayOrMNO",
                      value: {
                        realTimeOrDelayed:
                          billings.basics.management.tag == "ByGatewayOrMNO"
                            ? billings.basics.management.value.realTimeOrDelayed
                            : "RealTime",
                        visibility: ev.target.value as
                          | "SuccessOnly"
                          | "BothSuccessFailure"
                          | "NoUsefulNotofications"
                          | "Undefined"
                      }
                    }
                  }
                })
              }
              value={billings.basics.management.value.visibility}
            >
              <option value="Undefined">-</option>
              <option value="BothSuccessFailure">
                We receive both Success and Failure notifications
              </option>
              <option value="SuccessOnly">
                We only receive Success notifications
              </option>
              <option value="NoUsefulNotofications">
                We do not receive any meaninful notifications in a reasonable
                time (like KSA)
              </option>
            </select>
          </div>
        </div>
      ) : null}
    </section>
  );
}
