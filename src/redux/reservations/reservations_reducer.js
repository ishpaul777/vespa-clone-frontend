/* eslint-disable */
const RESERVE_TEST_DRIVE = "RESERVE_TEST_DRIVE";
const CANCEL_TEST_DRIVE = "CANCEL_TEST_DRIVE";
const GET_RESERVATIONS = "GET_RESERVATIONS";

export const reserveReducer = (state = null, action) => {
  switch (action.type) {
    case RESERVE_TEST_DRIVE:
      if (!state) {
        return [action.payload];
      } else {
        return [...state, action.payload];
      }
    case CANCEL_TEST_DRIVE:
      const newState = state.filter(
        (reservation) => reservation.id !== action.payload
      );
      return newState;
    case GET_RESERVATIONS:
      return action.payload;
    default:
      return state;
  }
};

export const reserveTestDrive =
  (reservation, productId) => async (dispatch) => {
    const product_id = Number(productId);
    const response = await fetch(
      `http://localhost:3000/reservations/${product_id}`,
      {
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    dispatch({
      type: RESERVE_TEST_DRIVE,
      payload: data,
    });
  };

export const cancelTestDrive = (id) => async (dispatch) => {
  fetch(`http://localhost:3000/reservations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      dispatch({
        type: CANCEL_TEST_DRIVE,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllReservedProducts = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/reservations", {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
    });
    console.log(response);
    const data = await response.json();
    if (!data) {
      dispatch({ type: GET_RESERVATIONS, payload: [] });
    } else {
      dispatch({ type: GET_RESERVATIONS, payload: data });
    }
  };
}
