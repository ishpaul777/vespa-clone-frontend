const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const GET_PRODUCTS = 'GET_PRODUCTS';

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.payload;
    case REMOVE_PRODUCT:
      // delete product from state
      const newState = state.filter((product) => product.id !== action.payload);
      return newState;
    case GET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}

export function addProduct(product) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
    });
    // wait for 1000ms to simulate a loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
      body: product,
    });
    const data = await response.json();
    dispatch({ type: ADD_PRODUCT, payload: data });
    dispatch({
      type: 'SET_LOADING',
    });
  };
}

export function removeProduct(id) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
    });
    // wait for 1000ms to simulate a loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
    });
    if (response.ok) {
      dispatch({ type: REMOVE_PRODUCT, payload: id });
      dispatch({
        type: 'SET_LOADING',
      });
    } else {
      console.log('something went wrong');
    }
  };
}

export function getProducts() {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
    });
    // wait for 1000ms to simulate a loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch('http://localhost:3000/products', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
    });
    const data = await response.json();
    dispatch({ type: GET_PRODUCTS, payload: data });
    dispatch({
      type: 'SET_LOADING',
    });
  };
}
