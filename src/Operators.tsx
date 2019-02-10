import * as React from "react";
import { Operator, OperatorMakretShare } from "./_Types";
import Field from "./Field";

const SingleOperator: React.StatelessComponent<
  Operator & {
    onChange: (
      args: { name: string } | { marketShare: OperatorMakretShare }
    ) => void;
  }
> = ({ children, name, marketShare, onChange }) => {
  return (
    <section className="operator">
      <Field label="Name">
        <input
          value={name}
          onChange={ev => onChange({ name: ev.target.value })}
        />
      </Field>
      <Field label="Market Share">
        <select
          value={marketShare}
          onChange={ev =>
            onChange({
              marketShare: parseInt(ev.target.value) as OperatorMakretShare
            })
          }
        >
          {[10, 20, 30, 50, 75, 90, 100].map(x => (
            <option value={x} key={x.toString()}>
              ~ {x}%
            </option>
          ))}
        </select>
      </Field>
      {children || null}
    </section>
  );
};

const Operators = ({
  operators,
  setOperators
}: {
  operators: Operator[];
  setOperators: (os: Operator[]) => void;
}) => {
  return (
    <fieldset>
      <legend>Operators</legend>
      {operators.map(({ name, marketShare }, i) => (
        <SingleOperator
          key={i.toString()}
          name={name}
          marketShare={marketShare}
          onChange={args =>
            setOperators(
              operators.map((o, j) => (i == j ? { ...o, ...args } : o))
            )
          }
        >
          <Field label="">
            {operators.length > 1 ? (
              <button
                onClick={() =>
                  setOperators(
                    operators.slice(0, i).concat(operators.slice(i + 1))
                  )
                }
                className="add"
              >
                -
              </button>
            ) : null}
            {i == operators.length - 1 ? (
              <button
                onClick={() =>
                  setOperators(
                    operators.concat([{ name: "", marketShare: 10 }])
                  )
                }
                className="add"
              >
                +
              </button>
            ) : null}
          </Field>
        </SingleOperator>
      ))}
    </fieldset>
  );
};

export default Operators;
