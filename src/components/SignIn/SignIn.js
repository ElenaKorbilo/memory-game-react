import React from "react";
import { CHANGE_FIELD, SIGNIN } from "../../store/actions";
import { FormErrors } from "../FormErrors";
import history from '../history';


export const SignIn =({ setMainState, email, password, users}) => {
  

  const [user, setUser] = React.useState({})
  const [emailValid, setemailValid] = React.useState(false)
  const [passwordValid, setPasswordValid] = React.useState(false)
  const [formValid, setformValid] = React.useState(false)
  const [formErrors, setformErrors] = React.useState({ email: "", password: "" })

  React.useEffect(() => {
    validateForm()
  })

  const validateForm = React.useCallback(() => {
    setformValid (emailValid && passwordValid)
  }, [emailValid, passwordValid])

  const handleChange = ({ target: { name, value }}) => {
    setMainState(CHANGE_FIELD, { [name]: value })

    validateField(name, value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setMainState(SIGNIN);
    history.push("/protected");

    setUser([])
    setemailValid(false)
    setPasswordValid(false)
    setformValid(false)
    setformErrors({ email: "", password: "" })
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let emailIsValid = emailValid;
    let passwordIsValid = passwordValid;
    let isUser = user;

    switch (fieldName) {
      case "email":
        isUser = users.find(user => user.email === value );

        emailIsValid = isUser !== undefined;
        fieldValidationErrors.email = emailIsValid ? "" : " do not registered";
        setemailValid(emailIsValid)
        setUser(isUser)
        break;
      case "password":
        if(user !== undefined){
          passwordIsValid = user.password === value;
        }
        fieldValidationErrors.password = passwordIsValid ? "" : " is invalid";
        setPasswordValid(passwordIsValid)
        break;
      default:
        break;
    }

    setformErrors(fieldValidationErrors)
  }

  const onClick = () => {
    history.push("/signup");
  }

  return (
      <div className="container mt-5">
            <h1 className="text-center">GAME MEMORY</h1>
        <div className="row justify-content-center">
          <div className="col-md-offset-3 col-md-3">
            <form
              onSubmit={handleSubmit}
              className="form-horizontal"
            >
              <div>
                <FormErrors formErrors={formErrors} />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={!formValid}
              >
                Sign In
              </button>
              <button className="btn btn-primary mt-3 ms-3" onClick={onClick}>Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }