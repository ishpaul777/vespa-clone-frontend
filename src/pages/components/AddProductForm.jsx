
import React from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/products/products_reducer'

function AddProductForm() {
	const dispatch = useDispatch()


	const [product, setProduct] = React.useState({
		model: '',
		color: '',
		price: '',
		description: ''
	})


	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('product[model]', product.model)
		formData.append('product[color]', product.color)
		formData.append('product[price]', product.price)
		formData.append('product[description]', product.description)
		// const user = JSON.parse(localStorage.getItem('user'))
		// formData.append('product[id]', user.id)
		// formData.append('product[image]', e.target.image.files[0])
		for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}

		submitToBackend(formData)
	}

	const submitToBackend = (formData) => {
		dispatch(addProduct(formData))
	}

	return (
		<div className="add-product-form">
			<h1>Add Product</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label htmlFor="model">Model</label>
					<input
						className='form-control'
						onChange={handleChange}
						type="text"
						name="model" id="model" />
				</div>
				<div>
					<label htmlFor="color">Color</label>
					<input
						className='form-control'
						onChange={handleChange}
						type="text"
						name="color" id="color" />
				</div>
				<div>
					<label htmlFor="price">Price</label>
					<input
						className='form-control'
						onChange={handleChange}
						type="text"
						name="price" id="price" />
				</div>
				<div>
					<label htmlFor="image">Image</label>
					<input
						className='form-control'
						type="file"
						multiple
						name="image" id="image" />
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						className='form-control'
						onChange={handleChange}
						name="description"
						id="description" />
				</div>
				<button type="submit">Add Product</button>
			</form>
		</div>
	)
}

export default AddProductForm

// product attributes
// model name
// color
// price
// image
// description
