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
  const [gender, setGender] = useState('')
  const [genderError, setGenderError] = useState(true)
  const [dob, setDob] = useState('');
  const [isAgeValid, setIsAgeValid] = useState(true);


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

  const handleDobChange = (e) => {
    setDob(e.target.value);
    validateAge(e.target.value);
  };

  const validateAge = (selectedMonth, day, year) => {
    debugger
    const today = new Date();
    const birthDate = new Date(year, parseInt(selectedMonth) - 1, day);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }


    if (age >= 18) {
      // Subtract 1 from age if birthdate is later in the year than today
      return true
    } else {
      return false;
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check age condition
    if (!validateAge(selectedMonth, day, year)) {
      setErrors(['You must be 18 or older to sign up']);
      return; // Exit the function
    } else {
      setErrors([]);

    }

    // Check gender error
    if (!gender) {
      setGenderError('');
      return; // Exit the function
    } else {
      setGenderError(true)
    }

    // If no errors, clear any previous errors and dispatch the signup action
    setErrors([]);

    // Assuming you have defined dispatch and sessionActions properly
    dispatch(sessionActions.signup({ email, username, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
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
              <input className="form"
                type="text"
                placeholder="Enter your email."
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
              <div id="email_errors"></div>
            </div>

            <div id="password">
              <label>
                Create a password
              </label>
              <input className="form"
                type="password"
                placeholder="Create a password."
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
              <div id="password_errors"></div>
            </div>

            <div id="username">
              <label>What should we call you?</label>
              <input className="form"
                type="text"
                placeholder="Enter a profile name."
                value={username}
                onChange={(e) => setUsername(e.target.value)}

              />
              <div id="username_errors"></div>
              <div className="note">
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
                  <div id="input_month">
                    <select id="select_month" value={selectedMonth} onChange={handleMonthChange}>
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
                  <input className="form"
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
                  <input className="form"
                    type="text"
                    inputMode="numeric"
                    placeholder="YYYY"
                    onChange={handleYearChange}
                    value={year}
                  /></div>
                <div id="birthday_errors"></div>
              </div>
              <fieldset role="radiogroup">
                <legend >What's your gender?</legend>
                <div id="radio">
                  <div className="radio_inputs">
                    <input className="genderinput" id="male" name="gender" value={"male"}
                      type="radio" onChange={(e) => setGender(e.target.value)} />
                    <label className="genderlabel" for="male">
                      <span className="radio_buttons"></span>
                      <span> Male</span></label>
                  </div>
                  <div className="radio_inputs">
                    <input className="genderinput" id="female" name="gender" value={"female"}
                      type="radio" onChange={(e) => setGender(e.target.value)} />
                    <label className="genderlabel" for="female">
                      <span className="radio_buttons">
                      </span>
                      <span>
                        Female
                      </span>
                    </label>
                  </div>
                  <div className="radio_inputs">
                    <input className="genderinput" id="nonbinary" name="gender" value={"Non-binary"}
                      type="radio" onChange={(e) => setGender(e.target.value)} />
                    <label className="genderlabel" for="nonbinary">
                      <span className="radio_buttons"></span>

                      <span>  Non-binary</span>
                    </label>
                  </div>
                  <div className="radio_inputs">
                    <input className="genderinput" id="other" name="gender" value={"other"}
                      type="radio" onChange={(e) => setGender(e.target.value)} />
                    <label className="genderlabel" for="other">
                      <span className="radio_buttons"></span>

                      <span> Other</span></label>
                  </div>
                  <div className="radio_inputs">
                    <input className="genderinput" id="idk" name="gender" value={"idk"}
                      type="radio" onChange={(e) => setGender(e.target.value)} />
                    <label className="genderlabel" for="idk">
                      <span className="radio_buttons"></span>
                      <span> Prefer not to say</span>
                    </label>
                  </div> {!genderError ?
                    <div id="errorMessage" style={{ color: 'red' }}>Select your gender.</div> : <div></div>
                  }
                </div>
              </fieldset>


            </div>
            <div id="signupbutton">
              <button type="submit">Sign Up</button>
            </div>
          </form>

          <p>
            <span>Have an account?<NavLink id="login" to="/login">Log in.</NavLink></span>
          </p>


        </body >
      </div >
    </>
  );
}

export default SignupFormPage;