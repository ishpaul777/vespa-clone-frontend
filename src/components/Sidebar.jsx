import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/users/user_reducer";
import { FaBars, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sideBar.css";
import Vespalogo from "./vespaLogo";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  )

  const navigate = useNavigate();

  React.useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const menuItem = [
    {
      path: "/",
      name: "Motorcycles",
    },
    {
      path: "/reserve",
      name: "Reserve",
    },
    {
      path: "/myReservations",
      name: "My Reservations",
    },
  ];

  const user = useSelector((state) => state.user);

  user.role === "admin" && menuItem.push(
    {
      path: "/addProduct",
      name: "Add Product",
    },
  )


  return (
    <div className="sideBar-container">
      <div
        style={{
          width: isOpen ? (matches ? "250px" : "300px") : (matches ? "12vw" : "75px"),
          paddingLeft: isOpen || "0",
        }}
        className="sidebar"
      >
        <div
          className="top_section d-flex align-items-center"
          style={{ width: isOpen || "fit-content" }}
        >
          {isOpen && <Vespalogo />}
          <div
            style={{
              marginLeft: isOpen ? "50px" : "0px",
              padding: isOpen ? "0px" : "10px",
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
              key={index}
              className="link"
              activeclassName="active"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <button
          className="logout-btn btn btn-light"
          style={{ display: isOpen ? "block" : "none", alignSelf: "flex-start" }}
          onClick={() => {
            dispatch(logout());
            // redirect to login page
            navigate("/");
          }}
        >
          Logout
        </button>
        <div
          className="social-media"
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <FaTwitter />
          <FaFacebookF />
          <FaLinkedinIn />
        </div>
      </div>
      <main>{children}</main>
    </div >
  );
};

export default Sidebar;
