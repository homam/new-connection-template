import * as React from "react";
import {
  IHash,
  Tariff,
  Tariffs,
  MNOTariffs,
  defaultTariff,
  defaultTariffs
} from "./_Types.Billings";
import Field from "./Field";
import ServicesTariffsComponent from "./Billings.Tariffs";

export default function MNOTariffsComponent({
  tariffs,
  onChange,
  operators,
  services
}: {
  tariffs: MNOTariffs;
  onChange: (tariffs: MNOTariffs) => void;
  operators: string[];
  services: string[];
}) {
  return (
    <div>
      <section>
        <label>
          <input
            type="radio"
            checked={tariffs.tag == "AllMNOsHaveSimilarTariffs"}
            onChange={ev =>
              ev.target.checked
                ? onChange({
                    tag: "AllMNOsHaveSimilarTariffs",
                    value:
                      tariffs.tag == "AllMNOsHaveSimilarTariffs"
                        ? tariffs.value
                        : tariffs.value[operators[0]] || defaultTariffs
                  })
                : null
            }
          />
          All MNOs have similar Tariffs
        </label>
        <label className="space-left">
          <input
            type="radio"
            checked={tariffs.tag == "SomeMNOsHaveDifferentTariffs"}
            onChange={ev =>
              ev.target.checked
                ? onChange({
                    tag: "SomeMNOsHaveDifferentTariffs",
                    value:
                      tariffs.tag == "SomeMNOsHaveDifferentTariffs"
                        ? tariffs.value
                        : (operators
                            .map(o => ({
                              [o]:
                                tariffs.tag == "AllMNOsHaveSimilarTariffs"
                                  ? tariffs.value
                                  : defaultTariffs
                            }))
                            .reduce(
                              (acc, a) => ({ ...acc, ...a }),
                              {}
                            ) as IHash<Tariffs>)
                  })
                : null
            }
          />
          Some MNOs have different Tariffs
        </label>
      </section>
      {tariffs.tag == "AllMNOsHaveSimilarTariffs" ? (
        <ServicesTariffsComponent
          services={services}
          tariffs={tariffs.value}
          onChange={value =>
            onChange({
              ...tariffs,
              value
            })
          }
        />
      ) : (
        operators.map(o => (
          <fieldset className="indent-1" key={o}>
            <legend align="right">{o}</legend>
            <ServicesTariffsComponent
              services={services}
              tariffs={tariffs.value[o]}
              onChange={t =>
                onChange({
                  tag: "SomeMNOsHaveDifferentTariffs",
                  value: { ...(tariffs.value || {}), [o]: t }
                })
              }
            />
          </fieldset>
        ))
      )}
    </div>
  );
}
