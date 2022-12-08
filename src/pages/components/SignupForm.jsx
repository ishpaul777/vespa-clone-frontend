import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/users/user_reducer'

function SignupForm() {


	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	})

	const dispatch = useDispatch()

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const validateFormData = () => {
		const { name, email, password, password_confirmation } = formData

		if (name === '') {
			console.log('Name is required')
			return false
		}
		if (email === '' || !email.includes('@') || !email.includes('.')) {
			console.log('Email is required')
			return false
		}
		if (password === '' || password.length < 6) {
			console.log('Password is required and must be at least 6 characters')
			return false
		}
		if (password_confirmation === '' || password_confirmation !== password) {
			console.log('Password confirmation is required and must match password')
			return false
		}

		return true
	}



	const handleSubmit = (event) => {
		event.preventDefault()

		if (validateFormData()) {
			signup(formData)
		}
	}

	const signup = async (user) => {
		const userdata = {
			user: user,
		}

		const response = await fetch('http://localhost:3000/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userdata),
		});

		const data = await response.json();

		if (data.status.code === 200 ) {
			dispatch(login(user))
		}
		else {
			console.log(data.errors)
		}

	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Name</label>
					<input
						type="name"
						name="name"
						id="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="password_confirmation">Confirm Password</label>
					<input
						type="password"
						name="password_confirmation"
						id="password_confirmation"
						value={formData.password_confirmation}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	)
}

export default SignupForm;
