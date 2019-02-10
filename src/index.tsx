import * as React from "react";
import { render } from "react-dom";
import * as pako from "pako";
import { Operator, FormState, defaultState, defaultServices } from "./_Types";
import Field from "./Field";
import Operators from "./Operators";
import Services from "./Services";
import Flows from "./Flows";
import Billings from "./Billings";

import "./styles.scss";

function App() {
  let cachedFormState = null;
  try {
    cachedFormState = JSON.parse(localStorage.getItem("formState"));
  } catch (ex) {
    console.warn(ex);
  }
  const [state, setState] = React.useState<FormState>(
    cachedFormState || defaultState
  );
  localStorage.setItem("formState", JSON.stringify(state));
  // console.log(
  //   btoa(pako.deflate(JSON.stringify(state), { to: "string" })).length,
  //   btoa((JSON.stringify(state))).length
  // );
  console.log(JSON.stringify(state));
  return (
    <form
      className="App"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <fieldset>
        <legend>Basics</legend>
        <section>
          <Field label="Country">
            <select />
          </Field>
          <Field label="Gateway">
            <input />
          </Field>
        </section>
      </fieldset>
      <Operators
        operators={state.operators}
        setOperators={operators => setState({ ...state, operators })}
      />
      <Services
        services={state.services || defaultServices}
        onChange={services => setState({ ...state, services })}
      />
      <Flows
        flows={state.flows}
        setFlows={flows => setState({ ...state, flows })}
        operators={state.operators.map(o => o.name)}
      />
      <Billings
        billings={state.billings}
        setBillings={billings => setState({ ...state, billings })}
        operators={state.operators.map(o => o.name)}
        services={state.services.map(o => o.name)}
      />

      <fieldset>
        <legend>Messages</legend>
        <input type="checkbox" />
      </fieldset>
      <fieldset>
        <legend>Marketing Strategy</legend>
      </fieldset>
    </form>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
