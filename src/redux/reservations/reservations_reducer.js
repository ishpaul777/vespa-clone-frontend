const RESERVE_TEST_DRIVE = 'RESERVE_TEST_DRIVE';
const CANCEL_TEST_DRIVE = 'CANCEL_TEST_DRIVE';

export const reserveReducer = (state = [], action) => {
	switch (action.type) {
		case RESERVE_TEST_DRIVE:
			return [...state, action.payload];
		case CANCEL_TEST_DRIVE:
			return state.filter(reservation => reservation.id !== action.payload);
		default:
			return state;
	}
}

export const reserveTestDrive = (reservation, productId) => {
	return async (dispatch) => {
		let product_id = Number(productId)
		const response = await fetch(`http://localhost:3000/products/${product_id}/reservations/`, { // -> /products/:product_id/reservations
			method: 'POST',
			headers: {
				Authorization: JSON.parse(localStorage.getItem('user')).token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reservation),
		});
		const data = await response.json();
		if (data.status.code === 200) {
			dispatch({
				type: RESERVE_TEST_DRIVE,
				payload: data.data,
			});
		} else {
			console.log(data);
		}
	};
};

export const cancelTestDrive = (id) => {
	return async (dispatch) => {
		fetch(`http://localhost:3000/reservations/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: JSON.parse(localStorage.getItem('user')).token,
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: CANCEL_TEST_DRIVE,
					payload: data.data.id,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
}
