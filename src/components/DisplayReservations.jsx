import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReservedProducts } from '../redux/reservations/reservations_reducer';

const DisplayReservations = () => {
    const data = useSelector((state) => state.reservations);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data.length) {
            dispatch(getAllReservedProducts());
        }
    }, [data]);

    const reserves = data.map((item) => (
        <tr key={item.id}>
          {' '}
          <td key={item.id}>{item.city}</td>
        </tr>
      ));

      return <tbody>{reserves}</tbody>;
};

export default DisplayReservations;