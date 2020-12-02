import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import jwtDecode, { JwtPayload } from "jwt-decode";

// @ts-ignore
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import axios from "axios";
import * as serviceWorker from "./serviceWorker";
import theme from "theme";
import { setAuthenticated } from "features/user/userSlice";
import { getUserData, logOutUser } from "features/user/userSlice";

let persistor = persistStore(store);

axios.defaults.baseURL = process.env.REACT_APP_FIREBASE_FUNCTIONS;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken: JwtPayload = jwtDecode(token);
  if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser());
    window.location.href = "/";
  } else {
    store.dispatch(setAuthenticated(null));
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <MuiThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
