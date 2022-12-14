import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReservedProducts } from '../redux/reservations/reservations_reducer';

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
         
      </div>
    );
};

export default MyReservations;