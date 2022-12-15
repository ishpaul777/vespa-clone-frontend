import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './users/user_reducer';
import productsReducer from './products/products_reducer';
import loadingReducer from './loading/load_reducer';
import { reserveReducer } from './reservations/reservations_reducer';

const rootReducer = combineReducers({
  // Reducers
  user: userReducer,
  products: productsReducer,
  loading: loadingReducer,
  reservations: reserveReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
