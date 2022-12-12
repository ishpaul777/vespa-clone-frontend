import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../redux/products/products_reducer'
import ScooterAnimation from '../components/ScooterAnimation'


function ProductDetails() {
	// get the id from the url
	let { id } = useParams()

	id = parseInt(id)
	// get the product from the store if it exists else fetch product from the server
	const products = useSelector((state) => state.products)
	const dispatch = useDispatch()

	if (!products || !products.length) {
		dispatch(getProducts())
	}
	// find the product with the id
	const product = products.find((product) => product.id === id)

	if (!product) return (
		<div>
			<ScooterAnimation />
		</div>
	)

	return (
		<div>
			<h1>Product Details</h1>
			<h2>{product.name}</h2>
			<p>{product.description}</p>
			<div className='product-img-container'>
				<img src={product.image_url} alt={product.name} className="product_image" />
			</div>
		</div>
	)
}

export default ProductDetails;



