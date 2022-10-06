import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/context';

const errorClass = (error) => (error ? 'is-invalid' : '');

const SignIn = () => {
  const { sessionStore } = useStores();
  const history = useHistory();
  const [user, setUser] = useState({
    email: '', password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);

  const validateField = useCallback((fieldName, value) => {
    let valid;
    switch (fieldName) {
      case 'email':
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        return valid ? '' : 'Email is invalid';
      case 'password':
        valid = value.length >= 6;
        return valid ? '' : 'Password is too short';
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
    sessionStore.login({ user })
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
              Invalid credentials
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
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(SignIn);
