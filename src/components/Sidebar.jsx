/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaBars, FaFacebookF, FaTwitter, FaLinkedinIn,
} from 'react-icons/fa';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/users/user_reducer';
import '../styles/sideBar.css';
import Vespalogo from './vespaLogo';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const menuItem = [
    {
      path: '/',
      name: 'Motorcycles',
    },
    {
      path: '/reserve',
      name: 'Reserve',
    },
    {
      path: '/myReservations',
      name: 'My Reservations',
    },
  ];

  return (
    <div className="sideBar-container">
      <div
        style={{
          width: isOpen ? '250px' : '60px',
          paddingLeft: isOpen || '0',
        }}
        className="sidebar"
      >
        <div
          className="top_section d-flex align-items-center"
          style={{ width: isOpen || 'fit-content' }}
        >
          {isOpen && <Vespalogo />}
          <div
            style={{
              marginLeft: isOpen ? '50px' : '0px',
              padding: isOpen ? '0px' : '10px',
            }}
            className="open-close-icons"
          >
            {isOpen ? (
              <BsFillArrowLeftSquareFill onClick={toggle} />
            ) : (
              <FaBars onClick={toggle} className="menu-bars" />
            )}
          </div>
        </div>
        <div className="links-container">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={`${index}${item.name}`}
              className={({ isActive }) => `${isActive ? 'active' : 'none'} link`}
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <div
                style={{ display: isOpen ? 'block' : 'none' }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          {
            user.role === 'admin' && (
              <NavLink
                to="/addProduct"
                className={({ isActive }) => `${isActive ? 'active' : 'none'} link`}
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                <div
                  style={{ display: isOpen ? 'block' : 'none' }}
                  className="link_text"
                >
                  Add Product
                </div>
              </NavLink>
            )
          }
        </div>
        <button
          type="button"
          className="logout-btn btn btn-light"
          style={{ display: isOpen ? 'block' : 'none', alignSelf: 'flex-start' }}
          onClick={() => {
            dispatch(logout());
            // redirect to login page
            navigate('/');
          }}
        >
          Logout
        </button>
        <div
          className="social-media"
          style={{ display: isOpen ? 'flex' : 'none' }}
        >
          <FaTwitter />
          <FaFacebookF />
          <FaLinkedinIn />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
