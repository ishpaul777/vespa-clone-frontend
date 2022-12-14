import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReservedProducts } from '../redux/reservations/reservations_reducer';
import Table from 'react-bootstrap/Table';

const MyReservations = () => {
    const data = useSelector((state) => state.reservations);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data.length) {
            dispatch(getAllReservedProducts());
        }
    }, [dispatch]);

    console.log(data)

    return (
      <div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>CITY</th>
          <th>DATE OF RESERVATION</th>
          <th>PRODUCT NAME</th>
          <th>PRODUCT COLOR</th>
        </tr>
      </thead>
      {data.map((item, index) => (
             <tbody>
             <tr>
              <td>{item.city}</td>
               <td>{item.reserved_date}</td>
               <td>product name</td>
               <td>product color</td>
             </tr>
           </tbody>
      ))}
     
    </Table>
      </div>
    );
};

export default MyReservations;