import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import SignIn from './components/auth/sign-in';
import SignUp from './components/auth/sign-up';
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.scss';
import PrivateRoute from './private-route';
import rootStore from './stores/root-store';
import { RootStoreProvider } from './stores/context';
import FilesContainer from './components/files/files-container';
import Toast from './components/common/toast';

// Define the main app
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    rootStore.restore().then(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <Router>
        <div className="App">
          <Header />
          <Toast />
          <div className="container">
            <div>
              <PrivateRoute exact path="/" component={FilesContainer} />
              <Route path="/sign_in" component={SignIn} />
              <Route path="/sign_up" component={SignUp} />
            </div>
          </div>
        </div>
      </Router>
    </RootStoreProvider>
  );
};

export default observer(App);
