import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { useStores } from './stores/context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { sessionStore } = useStores();
  return (
    <Route
      {...rest}
      render={(props) => (sessionStore.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/sign_in' }} />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired
};

export default observer(PrivateRoute);
