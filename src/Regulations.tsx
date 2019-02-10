import * as React from "react";
import {
  Regulations,
  MarketRegulationCondition,
  WelcomeMessage,
  LandingPageApproval
} from "./_Types.Regulations";

export default function RegulationsComponent({
  regulations,
  onChange
}: {
  regulations: Regulations;
  onChange: (regulations: Regulations) => void;
}) {
  return (
    <fieldset>
      <legend>Regulatios</legend>
      <section>
        {["Strict", "Mild", "Unregulated"].map((c, i) => (
          <label className={i > 0 ? "space-left" : ""} key={c}>
            <input
              type="radio"
              checked={regulations.marketCondition == c}
              onChange={ev =>
                onChange({
                  ...regulations,
                  marketCondition: c as MarketRegulationCondition
                })
              }
            />
            {c}
          </label>
        ))}
      </section>
      <Messages
        type="Welcome"
        messages={regulations.welcomeMessage}
        onChange={welcomeMessage =>
          onChange({
            ...regulations,
            welcomeMessage
          })
        }
      />
      <Messages
        type="Reminder"
        messages={regulations.reminderMessages}
        onChange={reminderMessages =>
          onChange({
            ...regulations,
            reminderMessages
          })
        }
      />
      <section>
        <div>
          <label>
            <input
              type="radio"
              checked={regulations.serviceApproval.tag == "OK"}
              onChange={ev =>
                onChange({
                  ...regulations,
                  serviceApproval: ev.target.checked
                    ? { tag: "OK" }
                    : { tag: "Difficult", value: "" }
                })
              }
            />
            Service Approval is quite Easy
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              checked={regulations.serviceApproval.tag == "Difficult"}
              onChange={ev =>
                onChange({
                  ...regulations,
                  serviceApproval: !ev.target.checked
                    ? { tag: "OK" }
                    : { tag: "Difficult", value: "" }
                })
              }
            />
            Service Approval is Difficult
          </label>
        </div>
        {regulations.serviceApproval.tag == "Difficult" ? (
          <div className="indent-1">
            <textarea
              value={regulations.serviceApproval.value}
              onChange={ev =>
                onChange({
                  ...regulations,
                  serviceApproval: { tag: "Difficult", value: ev.target.value }
                })
              }
              cols={60}
              rows={2}
            />
          </div>
        ) : null}
      </section>
      <section>
        <select
          value={regulations.landingPageApprival}
          onChange={ev =>
            onChange({
              ...regulations,
              landingPageApprival: ev.target.value as LandingPageApproval
            })
          }
        >
          <option value="NotNeeded">
            Landing Page Approval is Not Required
          </option>
          <option value="OneWeek">
            Landing Page Approval is quite Fast (less than a week)
          </option>
          <option value="MoreThanOneWeek">
            Landing Page Apprival may take longer than a week
          </option>
        </select>
      </section>
      <section>
        <div>
          <label>
            <input
              type="checkbox"
              checked={"string" === typeof regulations.moreInfo}
              onChange={ev =>
                onChange({
                  ...regulations,
                  moreInfo: ev.target.checked ? "" : null
                })
              }
            />
            There are special regulations (like users have to opt-in for VAS
            services, ...)
          </label>
        </div>
        {"string" === typeof regulations.moreInfo ? (
          <div className="indent-1">
            <textarea
              value={regulations.moreInfo}
              onChange={ev =>
                onChange({
                  ...regulations,
                  moreInfo: ev.target.value
                })
              }
              cols={60}
              rows={2}
            />
          </div>
        ) : null}
      </section>
    </fieldset>
  );
}

function Messages({
  messages,
  onChange,
  type
}: {
  messages: WelcomeMessage;
  onChange: (messages: WelcomeMessage) => void;
  type: string;
}) {
  return (
    <section>
      <div>
        <select
          value={messages.tag}
          onChange={ev =>
            onChange(
              ev.target.value == "ByGatewayOrMNO"
                ? {
                    tag: "ByGatewayOrMNO",
                    customizable: false
                  }
                : ({
                    tag: ev.target.value as "ByUs" | "NotRequired"
                  } as WelcomeMessage)
            )
          }
        >
          <option value="ByUs">We send the {type} Messages</option>
          <option value="ByGatewayOrMNO">
            Gateway or MNO sends the {type} Messages
          </option>
          <option value="NotRequired">{type} Messages are not Required</option>
        </select>
      </div>
      {messages.tag == "ByGatewayOrMNO" ? (
        <div className="indent-1">
          <label>
            <input
              type="checkbox"
              checked={messages.customizable}
              onChange={ev =>
                onChange({
                  tag: "ByGatewayOrMNO",
                  customizable: ev.target.checked
                })
              }
            />
            {type} Messages are Customizable
          </label>
        </div>
      ) : null}
    </section>
  );
}
