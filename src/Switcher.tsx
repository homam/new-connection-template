import * as React from "react";
import "./Switcher.scss";

export type State = "On" | "Off" | "Undefined";
export type StateMap<A> = (state: State) => A;

export default function Switcher({
  value,
  onChange,
  map
}: {
  value: State;
  onChange: StateMap<void>;
  map: StateMap<string>;
}) {
  return (
    <span className="tristate tristate-switcher">
      <input
        type="radio"
        name="item2"
        value="Off"
        checked={value == "Off"}
        onChange={ev => {
          ev.target.checked ? onChange("Off") : onChange("Undefined");
        }}
      />
      <input
        type="radio"
        name="item2"
        value="Undefined"
        checked={value == "Undefined"}
        onChange={ev => {
          ev.target.checked ? onChange("Undefined") : onChange("On");
        }}
      />
      <input
        type="radio"
        name="item2"
        value="On"
        checked={value == "On"}
        onChange={ev => {
          ev.target.checked ? onChange("On") : onChange("Off");
        }}
      />
      <i />
      <label>{map(value)}</label>
    </span>
  );
}
