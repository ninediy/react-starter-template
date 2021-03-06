import React from 'react';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// Feature Components(Loadable)
import { HomeLoadable, ContactLoadable, MypageLoadable } from './Loadable';
// Config Store with Localstorage
import configStore from './ConfigStore';
// Route Middleware

const { store, persistor } = configStore();

const Routes = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Route path="/" exact component={HomeLoadable} />
          <Route path="/contact" exact component={ContactLoadable} />

          <Route path="/mypage" exact component={MypageLoadable} />
        </div>
      </Router>
    </PersistGate>
  </Provider>
);

export default Routes;
