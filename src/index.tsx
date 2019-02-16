import * as React from "react";
import { render } from "react-dom";
import * as pako from "pako";
import { Operator, FormState, defaultState, defaultServices } from "./_Types";
import Field from "./Field";
import Operators from "./Operators";
import Services from "./Services";
import Flows from "./Flows";
import Billings from "./Billings";
import Regulations from "./Regulations";
import Payments from "./Payments";
import Marketing from "./Marketing";
import * as FileSaver from "file-saver";
import { GoogleLogin } from "react-google-login";
import { countries } from "countries-list";
const allCountries = Object.keys(countries)
  .filter(k => k != "GS")
  .map(k => ({ ...countries[k], iso: k }))
  .sort((a, b) => a.name.localeCompare(b.name));

import "./styles.scss";

function onSignIn(googleUser) {
  console.log(googleUser);
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function fromHash() {
  if (!!location.hash && location.hash.length > 10) {
    const enc = pako.inflate(atob(location.hash.slice(1)), { to: "string" });
    // location.hash = "";
    return JSON.parse(enc);
  }
}

function App() {
  const [state, setState1] = React.useState<FormState>(defaultState);

  const setState = (state: FormState) => {
    setState1(state);
    history.pushState(
      state,
      null,
      "#" + btoa(pako.deflate(JSON.stringify(state), { to: "string" }))
    );
    // localStorage.setItem("formState", JSON.stringify(state));
  };

  React.useEffect(() => {
    try {
      // cachedFormState = JSON.parse(localStorage.getItem("formState"));
      const st = fromHash() || defaultState;
      setState1(st);
      history.replaceState(st, document.title, document.location.href);
    } catch (ex) {
      console.warn(ex);
    }
  }, []);

  React.useEffect(() => {
    window.onpopstate = ev => {
      if (!!ev["state"]) {
        setState1(ev["state"]);
      }
    };
  }, []);

  const [message, setMessage] = React.useState(null);

  console.log(state);

  return (
    <form
      className="App"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <section className="buttons-bar">
        {/* <GoogleLogin
          clientId="886331529423-evtmqflmgs4ikhq1h2h8pks795tfnsi2.apps.googleusercontent.com"
          render={renderProps => (
            <button onClick={renderProps.onClick}>Login</button>
          )}
          buttonText="Login"
          isSignedIn={true}
          onSuccess={onSignIn}
          onFailure={(...args) => console.log("Login Failed", ...args)}
        /> */}
        <input
          id="load_file"
          type="file"
          accept=".connection"
          onChange={ev => {
            const fileToLoad = ev.target.files[0];
            var fileReader = new FileReader();
            fileReader.onload = fileLoadedEvent => {
              var textFromFileLoaded = fileLoadedEvent.target["result"];
              setState(JSON.parse(textFromFileLoaded));
            };
            fileReader.readAsText(fileToLoad, "UTF-8");
          }}
        />
        <label htmlFor="load_file">Open from Disk</label>
      </section>
      <h1>Connection Profile</h1>
      <fieldset>
        <legend>Basics</legend>
        <section>
          <Field label="Country">
            <select
              value={state.country || ""}
              onChange={ev => setState({ ...state, country: ev.target.value })}
            >
              {allCountries.map(k => (
                <option key={k.iso} value={k.iso}>
                  {k.name} ({k.iso}) {k.emoji}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Gateway">
            <input
              value={state.gateway}
              onChange={ev => setState({ ...state, gateway: ev.target.value })}
            />
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
      <Regulations
        regulations={state.regulations}
        onChange={regulations => setState({ ...state, regulations })}
      />
      <Payments
        payments={state.payments}
        onChange={payments => setState({ ...state, payments })}
      />
      <Marketing
        marketing={state.marketing}
        onChange={marketing => setState({ ...state, marketing })}
      />
      <section className="buttons-bar">
        {!!message ? <div>{message}</div> : null}
        <button
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            const enc = btoa(
              pako.deflate(JSON.stringify(state), { to: "string" })
            );
            location.hash = enc;

            const copyToClipboard = str => {
              const el = document.createElement("textarea");
              el.value = str;
              document.body.appendChild(el);
              el.select();
              document.execCommand("copy");
              document.body.removeChild(el);
            };

            copyToClipboard(window.location.href);
            setMessage("URL copied to your clipboard");
            setTimeout(() => setMessage(null), 1500);
          }}
        >
          Copy URL
        </button>
        <button
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            var blob = new Blob([JSON.stringify(state)], {
              type: "text/json;charset=utf-8"
            });
            FileSaver.saveAs(
              blob,
              `${state.country}-${state.gateway}.connection`
            );
          }}
        >
          Save to Disk
        </button>
      </section>
    </form>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
