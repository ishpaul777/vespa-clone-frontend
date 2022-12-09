import ScooterAnimation from "./components/ScooterAnimation";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { logout } from "../redux/users/user_reducer";
import React from 'react'

function Homepage() {
	const dispatch = useDispatch();
	return (
		<div>
			<ScooterAnimation />
			<button onClick={() =>{
				dispatch(logout())
				// redirect to login page
			}}>Logout</button>
		</div>
	)
}

export default Homepage
