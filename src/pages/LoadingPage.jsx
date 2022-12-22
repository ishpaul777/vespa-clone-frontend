/* eslint-disable */
import React from 'react';
import ScooterAnimation from '../components/ScooterAnimation';
import '../assets/loadingBoxed.css';

const LoadingPage = () => {
  return (
    <>
      <div className="w-100 h-100 box-animation-container flex-column align-items-center justify-content-center">
        <div className="boxes">
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <ScooterAnimation />
    </>
  );
}

export default LoadingPage;
