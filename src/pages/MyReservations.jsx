import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservedProducts } from '../redux/reservations/reservations_reducer';

const MyReservations = () => {
  const data = useSelector((state) => state.reservations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReservedProducts());
  }, [dispatch]);

  return (
    <div className="container w-75 d-flex-column align-items-center justify-content-center">
      <h1 className="text-center mt-5 mb-3"> MY RESERVATIONS </h1>
      <Table responsive="xl">
        <thead>
          <tr>
            <th>CITY</th>
            <th>DATE OF RESERVATION</th>
            <th>PRODUCT NAME</th>
            <th>PRODUCT COLOR</th>
          </tr>
        </thead>
        {data.length > 0
          ? data.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.city}</td>
                <td>{item.reserved_date}</td>
                <td>product name</td>
                <td>product color</td>
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
