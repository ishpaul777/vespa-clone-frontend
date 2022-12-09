import ScooterAnimation from "./components/ScooterAnimation";
import { useDispatch } from "react-redux";
import AddProductForm from "./components/AddProductForm";
import { logout } from "../redux/users/user_reducer";
import React from 'react'

function Homepage() {
	const dispatch = useDispatch();
	return (
		<div>
			{/* <ScooterAnimation /> */}
			<AddProductForm />
			<button onClick={() =>{
				dispatch(logout())
				// redirect to login page
			}}>Logout</button>
		</div>
	)
}

export default Homepage
