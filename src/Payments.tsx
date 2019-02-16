import * as React from "react";
import { Payments, Payout, Terms } from "./_Types.Payments";

export default function PaymentsComponent({
  payments,
  onChange
}: {
  payments: Payments;
  onChange: (payments: Payments) => void;
}) {
  return (
    <fieldset>
      <legend>Payments</legend>
      <section>
        <label>
          Payout:&nbsp;
          <select
            value={payments.payout}
            onChange={ev =>
              onChange({
                ...payments,
                payout: parseInt(ev.target.value) as Payout
              })
            }
          >
            {["Undefined", 75, 65, 55, 45, 35, 0].map(p => (
              <option value={p} key={p.toString()}>
                {p == "Undefined"
                  ? "-"
                  : p == 75
                  ? "~ 75% or More"
                  : p == 0
                  ? "~ 30% or Less"
                  : `~ ${p}%`}
              </option>
            ))}
          </select>
        </label>
      </section>
      <section>
        <label>
          Terms:&nbsp;
          <select
            value={payments.terms}
            onChange={ev =>
              onChange({
                ...payments,
                terms: parseInt(ev.target.value) as Terms
              })
            }
          >
            {["Undefined", 120, 90, 60].map(p => (
              <option value={p} key={p.toString()}>
                {p == "Undefined"
                  ? "-"
                  : p == 120
                  ? "4 Months or More"
                  : p == 60
                  ? "2 Months or Less"
                  : `3 Months`}
              </option>
            ))}
          </select>
        </label>
      </section>
    </fieldset>
  );
}
