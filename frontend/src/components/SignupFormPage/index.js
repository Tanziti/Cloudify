import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedMonth, setSelectedMonth] = useState('');
  const [day, setDay] = useState('');
  const [errors, setErrors] = useState([]);
  const [year, setYear] = useState('');


  if (sessionUser) return <Redirect to="/" />;

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setDay('');
  };

  const handleDayChange = (e) => {
    const inputValue = e.target.value;
    const maxDay = getMaxDay(selectedMonth, year);

    if (isValidDay(inputValue, maxDay)) {
      setDay(inputValue);
    } else {
      // Handle invalid input, e.g., show an error message
      setDay('');
    }
  };

  const getMaxDay = (month, year) => {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    switch (month) {
      case '04':
      case '06':
      case '09':
      case '11':
        return 30;
      case '02':
        return isLeapYear ? 29 : 28;
      default:
        return 31;
    }
  };

  const isValidDay = (day, maxDay) => {
    // Convert the day input to an integer for comparison
    const dayInt = parseInt(day, 10);
    return !isNaN(dayInt) && dayInt >= 1 && dayInt <= maxDay;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
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
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };
  return (
    <>
      <div id="section">
        <div className="header">

          <NavLink id="home" exact to="/"><img id="logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png" alt="spotifylogo" /></NavLink>
          <h1>Sign up for free to start listening.</h1>
        </div>
        <body>
          <div id="demouser">
            <button >Sign in as demo user</button>
          </div>
          <span id="divider">
            or
          </span>
          <div className="sectionDiv">
            <div className="formDiv">
              <form onSubmit={handleSubmit}>
                <h2>Sign up with your email address</h2>
                <ul>
                  {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                <div>

                </div>
                <div id="email">
                  <label>
                    What's your email?
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div id="password">
                  <label>
                    Password
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div id="username">
                  <label>What should we call you?
                    <input
                      type="text"
                      placeholder="Enter a profile name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </label>
                  <div>
                    <label id="note">This appears on your profile</label>
                  </div>
                </div>
                <div className="birthday">
                  <div id="dob">
                    <label >What's your date of birth?</label>
                  </div>
                  <div id="date">
                    <div id="month">
                      <label>Month</label>
                      <div>
                        <select value={selectedMonth} onChange={handleMonthChange}>
                          <option value="" disabled>Select Month</option>
                          {months.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div id="day">
                      <label>Day</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        placeholder="DD"
                        onChange={handleDayChange}
                        value={day}
                      />
                    </div>
                    <div id="year">
                      <label>Year</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="YYYY"
                        onChange={handleYearChange}
                        value={year}
                      /></div>
                  </div>

                </div>
                <div id="signupbutton">
                  <button type="submit">Sign Up</button>
                </div>
              </form>
              <p>
                <span>Have an account?<NavLink to="/login">Log in Here</NavLink></span>
              </p>
            </div>
          </div>
        </body>
      </div>
    </>
  );
}

export default SignupFormPage;