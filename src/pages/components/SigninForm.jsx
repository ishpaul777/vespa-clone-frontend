import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/users/user_reducer'


function SigninForm() {
	const [formData, setFormData] = React.useState({
		email: '',
		password: '',
	})

	const dispatch = useDispatch()

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if(vaidateData()) {
			dispatch(login(formData))
		}
	}

	const vaidateData = () => {
		if(formData.email === '' || formData.password === '') {
			console.log('Please fill all the fields')
			return false
		}
		return true
	}



	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						required
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
						placeholder="Password"
						required
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Sign In</button>
			</form>
		</div>
	)
}

export default SigninForm
