import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/context';
import NotificationsPopup from './common/notifications-popup';
import SettingsPopup from './common/settings-popup';

const Header = () => {
  const { sessionStore } = useStores();
  const { user, isAuthenticated } = sessionStore;

  const handleLogout = useCallback(() => {
    sessionStore.logout();
  }, []);

  const renderName = useCallback(() => isAuthenticated && (
    <div className="user">
      {user.fullName}
      <NotificationsPopup />
      <SettingsPopup />
    </div>
  ), [isAuthenticated, user]);

  return (
    <div className="App">
      <header className={`App-header ${isAuthenticated ? 'authorized' : ''}`}>
        {renderName()}
        <div className="buttons-container">
          {!isAuthenticated && (
            <Link to="/sign_in" className="btn btn-success mr-2">
              Sign In
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/sign_up" className="btn btn-success mr-2">
              Sign Up
            </Link>
          )}
          {isAuthenticated && (
            <button type="button" onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default observer(Header);
