import * as React from "react";
import { Service } from "./_Types";
import Field from "./Field";

const SingleService: React.StatelessComponent<
  Service & {
    onChange: (service: Service) => void;
  }
> = ({ children, name, onChange }) => {
  return (
    <section className="operator">
      <Field label="Name">
        <input
          value={name}
          onChange={ev => onChange({ name: ev.target.value })}
        />
      </Field>
      {children || null}
    </section>
  );
};

const Services = ({
  services,
  onChange
}: {
  services: Service[];
  onChange: (services: Service[]) => void;
}) => {
  return (
    <fieldset>
      <legend>Services</legend>
      {services.map(({ name }, i) => (
        <SingleService
          key={i.toString()}
          name={name}
          onChange={args =>
            onChange(services.map((o, j) => (i == j ? { ...o, ...args } : o)))
          }
        >
          <Field label="">
            {services.length > 1 ? (
              <button
                onClick={() =>
                  onChange(services.slice(0, i).concat(services.slice(i + 1)))
                }
                className="add"
              >
                -
              </button>
            ) : null}
            {i == services.length - 1 ? (
              <button
                onClick={() => onChange(services.concat([{ name: "" }]))}
                className="add"
              >
                +
              </button>
            ) : null}
          </Field>
        </SingleService>
      ))}
    </fieldset>
  );
};

export default Services;
