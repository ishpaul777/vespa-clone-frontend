import React, { useState } from 'react';
import {
    FaBars
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../styles/sideBar.css'


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Motorcycles",
        },
        {
            path:"/reserve",
            name:"Reserve",
        },
        {
            path:"/myReservations",
            name:"My Reservations",
        },
        {
            path:"/deleteMotorcycle",
            name:"Delete Motorcycle",
        },
        {
            path:"/addMotorcycle",
            name:"Add Motorcycle",
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "300px" : "70px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Vespa</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;