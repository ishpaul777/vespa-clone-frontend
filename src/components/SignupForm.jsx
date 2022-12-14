/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../redux/users/user_reducer';

const SignupForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  const dispatch = useDispatch();
	const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateFormData = () => {
    const {
      name, email, password, password_confirmation,
    } = formData;

    if (name === '') {
      console.log('Name is required');
      return false;
    }
    if (email === '' || !email.includes('@') || !email.includes('.')) {
      console.log('Email is required');
      return false;
    }
    if (password === '' || password.length < 6) {
      console.log('Password is required and must be at least 6 characters');
      return false;
    }
    if (password_confirmation === '' || password_confirmation !== password) {
      console.log('Password confirmation is required and must match password');
      return false;
    }

    return true;
  };

  const handleAdminChange = (event) => {
    setFormData({ ...formData, role: event.target.checked ? 'admin' : 'user' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFormData()) {
      signup(formData);
    }
  };

  const signup = async (user) => {
    const userdata = {
      user,
    };

    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata),
    });

    const data = await response.json();

    if (data.status.code === 200) {
      dispatch(login(user));
    } else {
      console.log(data.errors);
    }
		navigate('/')
  };

  return (
    <div className="Auth-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-content">
          <h3 className="Auth-title">Sign Up</h3>
          <div className="form-group mt-3 text-start">
            <label htmlFor="email">Name</label>
            <input
              type="name"
              className="form-control mt-1"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control mt-1"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              name="password_confirmation"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3 text-start d-flex align-items-start">
            <input
              type="checkbox"
              name="admin"
              id="admin"
              value={formData.admin}
              onChange={handleAdminChange}
              className="mt-1"
            />
            <label
              htmlFor="admin"
              className="text-start ml-2 mt-0"
            >
              Do you want to be an admin?
              {' '}
              <br />
              <i>(Becoming an admin will allow you to add and delete products)</i>
            </label>
          </div>
        </div>
        <div className="form-group mt-3 " />
        <div className="form-group mt-3 d-flex flex-column  align-items-center justify-content-center">
          <button type="submit" className="btn btn-primary w-75 mb-2">Submit</button>
          <p>
            Already have an account?
            {' '}
            <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
