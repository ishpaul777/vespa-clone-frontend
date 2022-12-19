// import { setLoading } from '../loading/load_reducer';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const initialState = JSON.parse(localStorage.getItem('user')) || null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

export const login = (user) => async (dispatch) => {
  const userdata = {
    user: {
      email: user.email,
      password: user.password,
    },
  };

  dispatch({
    type: 'SET_LOADING',
  });
  // wait for 1000ms to simulate a loading time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userdata),
  });
  const token = response.headers.get('Authorization');
  const data = await response.json();
  if (data.status.code === 200) {
    const localdata = {
      name: data.data.name,
      email: data.data.email,
      id: data.data.id,
      role: data.data.role,
      token,
    };
    localStorage.setItem('user', JSON.stringify(localdata));
    dispatch({
      type: LOG_IN,
      payload: data.data,
    });
  } else {
    console.log(data);
  }
  dispatch({
    type: 'SET_LOADING',
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetch('http://localhost:3000/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('user')).token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  localStorage.removeItem('user');
  dispatch({
    type: 'SET_LOADING',
  });
  dispatch({
    type: LOG_OUT,
  });
};

export default userReducer;
