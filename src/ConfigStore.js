import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

// logger
import { logger } from './utils/logger';
// Redux-promise middleware
import promise from 'redux-promise-middleware';
// Redux Reducers
import { MainReducer } from './features/redux';
import { HomeReducer } from './features/Home/redux';
import { ContactReducer } from './features/Contact/redux';
import { MypageReducer } from './features/Mypage/redux';

const persistConfig = {
  key: 'root',
  storage
  // blacklist: ['Main'],
  // whitelist: ['Main', 'Home', 'Contact']
};

const middleware = [thunk, logger, promise];

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    Main: MainReducer,
    Home: HomeReducer,
    Contact: ContactReducer,
    Mypage: MypageReducer
  })
);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleware));
  let persistor = persistStore(store);
  return { store, persistor };
};
