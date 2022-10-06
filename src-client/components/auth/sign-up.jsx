import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/context';

const errorClass = (error) => (error ? 'is-invalid' : '');

const SignUp = () => {
  const { sessionStore } = useStores();
  const history = useHistory();
  const [user, setUser] = useState({
    email: '', firstName: '', lastName: '', password: '', password2: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);

  const validateField = useCallback((fieldName, value) => {
    let valid;
    switch (fieldName) {
      case 'email':
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        return valid ? '' : 'Email is invalid';
      case 'firstName':
      case 'lastName':
        valid = !!value;
        return valid ? '' : 'Please fill this field';
      case 'password':
        valid = value.length >= 6;
        return valid ? '' : 'Password is too short';
      case 'password2':
        valid = value === user.password;
        return valid ? '' : 'Password doesn\'t match';
      default:
        return '';
    }
  }, [user]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const errors = {};
    Object.keys(user).forEach((field) => {
      errors[field] = validateField(field, user[field]);
    });
    setFormErrors(errors);
    const hasErrors = Object.values(errors).filter((e) => e).length;

    if (!user || hasErrors) return;
    sessionStore.register({
      user: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password: user.password
      }
    })
      .then(() => {
        setError(null);
        history.push('/');
      })
      .catch(setError);
  }, [user, formErrors]);

  const handleChange = useCallback((event) => {
    const name = event.target.id;
    const { value } = event.target;
    user[name] = value;
    setUser(user);
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  }, [user, formErrors]);

  return (
    <div className="card auth-form-body">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          { error && (
          <div className="alert alert-danger">
            Some error occurred
          </div>
          )}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errorClass(formErrors.email)}`}
              id="email"
              aria-describedby="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={user.email}
            />
            {formErrors.email && (
            <div className="invalid-feedback">
              {formErrors.email}
            </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              className={`form-control ${errorClass(formErrors.firstName)}`}
              id="firstName"
              aria-describedby="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              value={user.firstName}
            />
            {formErrors.firstName && (
            <div className="invalid-feedback">
              {formErrors.firstName}
            </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              Last Name
            </label>
            <input
              type="lastName"
              className={`form-control ${errorClass(formErrors.lastName)}`}
              id="lastName"
              aria-describedby="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              value={user.lastName}
            />
            {formErrors.lastName && (
            <div className="invalid-feedback">
              {formErrors.lastName}
            </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errorClass(formErrors.password)}`}
              id="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={user.password}
            />
            {formErrors.password && (
            <div className="invalid-feedback">
              {formErrors.password}
            </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password2">
              Repeat Password
            </label>
            <input
              type="password"
              className={`form-control ${errorClass(formErrors.password2)}`}
              id="password2"
              placeholder="Enter password2"
              onChange={handleChange}
              value={user.password2}
            />
            {formErrors.password2 && (
            <div className="invalid-feedback">
              {formErrors.password2}
            </div>
            )}
          </div>
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(SignUp);
