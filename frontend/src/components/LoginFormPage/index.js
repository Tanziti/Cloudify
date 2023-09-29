import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css';
import { Link, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom/";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
  }

  return (
    <div className="loginbackground">
      <header className="logInTopBar">
        <NavLink to='/' ><span className="cloudifyLogo"><i className="fa-solid fa-compact-disc"></i>&nbsp;Cloudify</span></NavLink>
      </header>

      <form id="logInForm" onSubmit={handleSubmit} >

        <h1>Log in to Cloudify</h1>
        <ul>
          {errors.map(error => <li key={error}><i className="fa-solid fa-circle-exclamation"></i> {error}</li>)}
        </ul>
        <hr />
        <label>Email or username
          <input
            type="text"
            value={credential}
            placeholder="Email or username"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>Password
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
          />
          Remember me</label>
        <button type="submit" >Log In</button>
        <button onClick={handleDemoLogin} >Demo Log In</button>
        <Link to="" onClick={e => e.preventDefault()}>Forgot your password?</Link>
        <hr />
        <h3>Don't have an account? <Link to="/signup">Sign up for Cloudify</Link></h3>

      </form>

    </div>
  )
}

export default LoginFormPage;