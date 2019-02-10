import * as React from "react";
import {
  IHash,
  Tariff,
  Tariffs,
  MNOTariffs,
  defaultTariff,
  defaultTariffs,
  MandatedBillingTariffLevel,
  BillingFrequency
} from "./_Types.Billings";
import Field from "./Field";

export default function ServicesTariffsComponent({
  tariffs,
  onChange,
  services
}: {
  tariffs: Tariffs;
  onChange: (tariffs: Tariffs) => void;
  services: string[];
}) {
  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            checked={tariffs.tag == "AllServicesHaveSimilarTariffs"}
            onChange={ev =>
              ev.target.checked
                ? onChange({
                    tag: "AllServicesHaveSimilarTariffs",
                    value:
                      tariffs.tag == "AllServicesHaveSimilarTariffs"
                        ? tariffs.value
                        : tariffs.value[services[0]] || defaultTariff
                  })
                : null
            }
          />
          All Services have similar Tariffs
        </label>
        <label className="space-left">
          <input
            type="radio"
            checked={tariffs.tag == "SomeServicesHaveDifferentTariffs"}
            onChange={ev =>
              ev.target.checked
                ? onChange({
                    tag: "SomeServicesHaveDifferentTariffs",
                    value:
                      tariffs.tag == "AllServicesHaveSimilarTariffs"
                        ? (services
                            .map(s => ({ [s]: tariffs.value || defaultTariff }))
                            .reduce(
                              (acc, a) => ({ ...acc, ...a }),
                              {}
                            ) as IHash<Tariff>)
                        : tariffs.value
                  })
                : null
            }
          />
          Some Services have different Tariffs
        </label>
      </div>
      {tariffs.tag == "AllServicesHaveSimilarTariffs" ? (
        <TariffComponent
          tariff={tariffs.value}
          onChange={value =>
            onChange({
              ...tariffs,
              value
            })
          }
        />
      ) : (
        services.map((s, i) => (
          <div className="indent-1" key={s}>
            <div>
              <h2>{s}</h2>
            </div>
            <div className="indent-1">
              <TariffComponent
                tariff={tariffs.value[s] || defaultTariff}
                onChange={tariff =>
                  onChange({
                    ...tariffs,
                    value: { ...tariffs.value, [s]: tariff }
                  })
                }
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function TariffComponent({
  tariff,
  onChange
}: {
  tariff: Tariff;
  onChange: (tariff: Tariff) => void;
}) {
  return (
    <div>
      <section>
        <div>
          <label>
            <input
              type="radio"
              checked={tariff.amount.tag == "UpToUs"}
              onChange={ev =>
                ev.target.checked
                  ? onChange({ ...tariff, amount: { tag: "UpToUs" } })
                  : null
              }
            />
            Tariff is up to us
          </label>
        </div>
        <div className="space-top">
          <label>
            <input
              type="radio"
              checked={tariff.amount.tag == "Mandated"}
              onChange={ev =>
                ev.target.checked
                  ? onChange({
                      ...tariff,
                      amount: {
                        tag: "Mandated",
                        value: { amount: "", level: "MarketStandard" }
                      }
                    })
                  : null
              }
            />
            Tariff is mandated
          </label>
        </div>
        {tariff.amount.tag == "Mandated" ? (
          <div className="indent-1">
            <div>
              <select
                value={tariff.amount.value.level}
                onChange={ev =>
                  onChange({
                    ...tariff,
                    amount: {
                      ...tariff.amount,
                      tag: "Mandated",
                      value: {
                        ...(tariff.amount.tag == "Mandated"
                          ? tariff.amount.value
                          : { amount: "", level: "MarketStandard" }),
                        level: ev.target.value as MandatedBillingTariffLevel
                      }
                    }
                  })
                }
              >
                <option value="MarketStandard">
                  Market Starndard Price Point
                </option>
                <option value="Premium">Premium Price Point</option>
                <option value="LowerThanCompetitors">
                  Lower than Competitors Price Point
                </option>
              </select>
            </div>
            <div className="space-top">
              <label>
                End-user tariff: &nbsp;
                <input
                  type="text"
                  value={tariff.amount.value.amount}
                  onChange={ev =>
                    onChange({
                      ...tariff,
                      amount: {
                        ...tariff.amount,
                        tag: "Mandated",
                        value: {
                          ...(tariff.amount.tag == "Mandated"
                            ? tariff.amount.value
                            : { amount: "", level: "MarketStandard" }),
                          amount: ev.target.value
                        }
                      }
                    })
                  }
                />
              </label>
            </div>
          </div>
        ) : null}
      </section>
      <section>
        <select
          value={tariff.frequency}
          onChange={ev =>
            onChange({
              ...tariff,
              frequency: ev.target.value as BillingFrequency
            })
          }
        >
          <option value="OneOff">One-off</option>
          <option value="Daily">Daily</option>
          <option value="FewTimesAWeek">A few times per week</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </section>
      <section>
        <label>
          <input
            type="checkbox"
            checked={tariff.retry.tag}
            onChange={ev =>
              onChange({
                ...tariff,
                retry: ev.target.checked
                  ? { tag: true, scaleDown: false }
                  : { tag: false }
              })
            }
          />{" "}
          With re-tries
          {tariff.retry.tag ? (
            <div className="indent-1">
              <select
                value={tariff.retry.scaleDown.toString()}
                onChange={ev =>
                  onChange({
                    ...tariff,
                    retry: tariff.retry.tag
                      ? { tag: true, scaleDown: ev.target.value == "true" }
                      : { tag: false }
                  })
                }
              >
                <option value="false">
                  Without Scale-down (micro) billing
                </option>
                <option value="true">With Scale-down (micro) billing</option>
              </select>
            </div>
          ) : null}
        </label>
      </section>
    </div>
  );
}
