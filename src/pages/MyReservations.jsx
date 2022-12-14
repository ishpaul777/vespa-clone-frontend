import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelTestDrive, getAllReservedProducts } from '../redux/reservations/reservations_reducer';
import LoadingPage from './LoadingPage';

const MyReservations = () => {
  const data = useSelector((state) => state.reservations);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!data) dispatch(getAllReservedProducts());
  }, [dispatch]);

  if (!data) return <LoadingPage />;

  return (
    <div className="container w-75 d-flex-column align-items-center justify-content-center">
      <h1 className="text-center mt-5 mb-3"> MY RESERVATIONS </h1>
      <Table responsive="xl">
        <thead>
          <tr>
            <th>CITY</th>
            <th>DATE OF RESERVATION</th>
            <th>PRODUCT MODEL</th>
            <th>View Product</th>
          </tr>
        </thead>
        {data.length
          ? data.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.city}</td>
                <td>
                  {
                    item.reserved_date.split('T')[0]
                  }
                </td>
                <td>
                  {item.product.model}
                </td>
                <td>
                  <Link to={`/products/${item.product.id}`} className="btn btn-primary">
                    View
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      dispatch(cancelTestDrive(item.id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))
          : (
            <tbody className="text-center">
              <tr>
                <td
                  colSpan="4"
                >
                  No reservations yet
                  <Link to="/reserve" className="mt-3 btn btn-primary w-25 m-auto d-block">
                    Add +
                  </Link>
                </td>
              </tr>
            </tbody>
          )}
      </Table>
    </div>
  );
};

export default MyReservations;
