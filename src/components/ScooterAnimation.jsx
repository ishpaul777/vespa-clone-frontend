import React from 'react';
import '../assets/scooter.css';

function ScooterAnimation() {
  return (
    <div className="aniamtion-container">
      <div id="scooter">
        <span className="wheels1" />
        <span className="wheels2" />
        <div id="stop">
          <div className="Sfront" />
          <div className="hlight" />
          <div className="handle" />
          <div className="Sback">
            <div className="seat">
              <small className="seatholder" />
            </div>
            <li className="seatbar" />
            <li className="seatbar2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScooterAnimation;
