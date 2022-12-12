import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ProductDetails() {
	// get the id from the url
	let { id } = useParams()

	id = parseInt(id)
	// get the product from the store
	const product = useSelector((state) => state.products.find((product) => product.id === id))

	console.log(product)
	// find the product with the id

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

export default ProductDetails



