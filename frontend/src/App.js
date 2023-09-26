import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";

function App() {
  const { pathname } = useLocation();

  if (pathname === "/signup") {
    document.querySelector("body").className = "signUpBody";
  } else {
    document.querySelector("body").classList.remove("signUpBody");
  }
  if (pathname === "/login") {
    document.querySelector("body").className = "logInBody"
  } else {
    document.querySelector("body").classList.remove("logInBody");
  }

  return (
    <>
      <Route exact path='/'>
        <div>
          <HomePage />
        </div>
      </Route>
      <Switch>
        <Route path="/login" >
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/artists/:artistId">

        </Route>
      </Switch>
    </>
  );
}

export default App;
