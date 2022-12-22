import React from "react";

import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import * as ReactDOMClient from "react-dom/client";
import reducers from "./reducers";
import App from "./App";
import "./index.css";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
     <Provider store={store}>
          <App />
     </Provider>
);
