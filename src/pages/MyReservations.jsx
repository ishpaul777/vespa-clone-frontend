import React from 'react';
import Table from 'react-bootstrap/Table';
import DisplayReservations from '../components/DisplayReservations';

const MyReservations = () => {

    return (
      <div className="container d-flex justify-content-between">
      <Table bordered striped>
        <thead>
          <tr>
            <th>My Rockets</th>
          </tr>
        </thead>

        <DisplayReservations />
      </Table>
    </div>
    );
};

export default MyReservations;