import ScooterAnimation from "../components/ScooterAnimation";
import { useDispatch } from "react-redux";
import { logout } from "../redux/users/user_reducer";
import React from 'react'

const Motorcycles = () => {
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
};

export default Motorcycles;
