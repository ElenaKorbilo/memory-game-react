import React from 'react'
import { CHANGE_FIELD, SIGNUP } from '../../store/actions';
import { FormErrors } from "../FormErrors";
import history from '../history';

export const SignUp = ({ setMainState, email, name, password, users }) => {
  
  const [retypePassword, setRetypePassword] = React.useState('')

  const [emailValid, setemailValid] = React.useState(false)
  const [passwordValid, setPasswordValid] = React.useState(false)
  const [retypePasswordValid, setretypePasswordValid] = React.useState(false)
  const [userValid, setuserValid] = React.useState(false)
  const [formValid, setformValid] = React.useState(false)
  const [formErrors, setformErrors] = React.useState({ email: "", password: "", retypePassword: "", user: "" })

  React.useEffect(() => {
    validateForm()
  })

  const validateForm = React.useCallback(() => {
    setformValid (emailValid && passwordValid && retypePasswordValid && userValid)
  }, [emailValid, passwordValid, retypePasswordValid, userValid])

  const handleChange = ({ target: { name, value } }) => {
    setMainState(CHANGE_FIELD, {[name]: value})

    validateField(name, value);
  };

  const handleRetype = ({ target: { name, value }}) => {
    setRetypePassword(value);

    validateField(name, value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    setMainState(SIGNUP, {email, name, password})
    history.push("/protected");
   
    setemailValid(false)
    setPasswordValid(false)
    setretypePasswordValid(false)
    setuserValid(false)
    setformValid(false)
    setformErrors({ email: "", password: "" })
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let emailIsValid = emailValid;
    let passwordIsValid = passwordValid;
    let retypePasswordIsValid = retypePasswordValid;
    let userIsValid = userValid;

    switch (fieldName) {
      case "email":
        emailIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        fieldValidationErrors.email = emailIsValid ? "" : " is invalid";

        let isUser = users.find(user => user.email === value );
        userIsValid = isUser ? false : true;
        fieldValidationErrors.user = userIsValid ? "" : " already registered";
        
        setemailValid(emailIsValid)
        setuserValid(userIsValid)
        break;
      case "password":
        passwordIsValid = value.length >= 6;
        fieldValidationErrors.password = passwordIsValid ? "" : " is too short";
        setPasswordValid(passwordIsValid)
        break;
      case "retypePassword":
        retypePasswordIsValid = value === password ? true : false;
        fieldValidationErrors.retypePassword = retypePasswordIsValid ? "" : " do not match";
        setretypePasswordValid(retypePasswordIsValid)
        break;
      default:
        break;
    }

    setformErrors(fieldValidationErrors)
  }

  const onClick = () => {
    history.push("/");
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">GAME MEMORY</h1>
      <div className="row justify-content-center">
        <div className="col-md-offset-3 col-md-3">
          <form onSubmit={handleSubmit} className="form-horizontal">
            { <div>
              <FormErrors formErrors={formErrors} />
            </div> }
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
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
            <div className="form-group">
              <label htmlFor="retypePassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="retypePassword"
                value={retypePassword}
                onChange={handleRetype}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={!formValid}
            >
              Sign Up
            </button>
            <button className="btn btn-primary mt-3 ms-3" onClick={onClick}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}