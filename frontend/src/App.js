import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Playbar from "./components/Footer";
import HomeNavBar from "./components/HomeNavBar";
import ShowPage from "./components/ShowPage";

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

      {!(window.location.pathname === "/login" || window.location.pathname === "/signup" || window.location.pathname.startsWith("/artists/")) && (
        <div className="home_page">
          <div className="home_page_top">
            <section className="home_page_left">
              <Sidebar />
            </section>
            {/* <Divider /> */}
            <section className="home_page_right">

              <ShowPage />

              <HomeNavBar />
            </section>
          </div>
          <Playbar />
        </div>
      )}

      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>

        <Route path="/signup">
          <SignupFormPage />
        </Route>

      </Switch>
    </>
  );
}

export default App;
