import React from 'react'
import ScooterAnimation from '../components/ScooterAnimation'
import { Link } from 'react-router-dom'

function Page404() {
	return (
		<>
			<div className="page404 w-100 d-flex flex-column align-items-center">
				<h1 className="text-center fw-bold">404</h1>
				<h2 className="text-center">Page not found</h2>
				<Link className="btn btn-primary w-20 mt-3" to="/">Go to home</Link>
			</div>
			<ScooterAnimation />
		</>
	)
}

export default Page404
