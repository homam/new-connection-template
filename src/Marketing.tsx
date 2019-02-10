import * as React from "react";
import { Marketing, RiskLevel, defaultMarketing } from "./_Types.Marketing";

export default function MarketingComponent({
  marketing,
  onChange
}: {
  marketing: Marketing;
  onChange: (markeing: Marketing) => void;
}) {
  return (
    <fieldset>
      <legend>Marketing Strategy</legend>
      <section>
        <label>Risk Level:&nbsp;</label>
        <select
          value={marketing.riskLevel}
          onChange={ev =>
            onChange({ ...marketing, riskLevel: ev.target.value as RiskLevel })
          }
        >
          {["Any Affiliate", "Trusted Affiliates", "Media Buying"].map(l => (
            <option key={l} value={l}>
              {l == "Any Affiliate" ? l + " is OK" : "Only " + l}
            </option>
          ))}
        </select>
      </section>
      <section>
        <div>Traffic types:</div>
        <div className="indent-1 cols-2">
          {Object.keys(defaultMarketing.traffic).map(t => (
            <div key={t}>
              <label>
                <input
                  type="checkbox"
                  checked={marketing.traffic[t]}
                  onChange={ev =>
                    onChange({
                      ...marketing,
                      traffic: { ...marketing.traffic, [t]: ev.target.checked }
                    })
                  }
                />
                {t}
              </label>
            </div>
          ))}
        </div>
      </section>
    </fieldset>
  );
}
