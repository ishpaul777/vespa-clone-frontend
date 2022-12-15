
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../redux/products/products_reducer";
import { reserveTestDrive } from '../redux/reservations/reservations_reducer'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function AddReservationForm() {
	const allProducts = useSelector((state) => state.products);
	const [productId, setProductId] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch()

	useEffect(() => {
		if (!allProducts.length) {
			dispatch(getProducts());
		}
	}, [dispatch]);



	const [reservation, setReservation] = React.useState({
		city: '',
		reserved_date: '',
	})


	const handleChange = (e) => {
		setReservation({
			...reservation,
			[e.target.name]: e.target.value
		})
	}

	const onProductChanged = (e) => setProductId(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(reserveTestDrive(reservation, productId))

		setReservation({
			city: '',
			reserved_date: '',
		})

		navigate('/myReservations');
	}

	const productsOptions = allProducts.map((product) => (
		<option key={product.id} value={product.id}>
			{product.model}
		</option>
	));


	return (
		<div className=" d-flex-column mt-5">
			<h1 className='text-center'>Add New Reservation</h1>
			<form onSubmit={(e) => handleSubmit(e)} className="container w-50 mt-3">
				<div className="mb-3">
					<label htmlFor="product" className="form-label">Product Model</label>
					<Form.Control as="select" name="products" value={productId} onChange={onProductChanged}>
						{productsOptions}
					</Form.Control>
				</div>
				<div className="mb-3">
					<label htmlFor="city" className="form-label">City</label>
					<input
						className='form-control'
						onChange={handleChange}
						type="text"
						value={reservation.city}
						name="city" id="city" />

				</div>
				<div className="mb-3">
					<label htmlFor="reserved_date" className="form-label">Date</label>
					<input
						className='form-control'
						onChange={handleChange}
						type="date"
						value={reservation.reserved_date}
						name="reserved_date" id="reserved_date" />
				</div>
				<button type="submit" className='btn btn-primary'>Add Reservation</button>
			</form>
		</div>
	)
}

export default AddReservationForm
