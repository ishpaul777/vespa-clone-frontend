const SET_LOADING = 'SET_LOADING';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return !state;
    default:
      return state;
  }
};

export default loadingReducer;
