import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./users/user_reducer";
import productsReducer from "./products/products_reducer";

const rootReducer = combineReducers({
  // Reducers
  user: userReducer,
  products: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
