//import ScooterAnimation from "../components/ScooterAnimation";
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../styles/carrocel.css";


import React from 'react'


const Motorcycles = () => {

  const [data, setData] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3001/static/shoes.json')
      .then((response) => response.json())
      .then(setData);
  }, []);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  if (!data || !data.length) return null;

  return (
    <div className="container">
      <div>
        <h1>Last Models</h1>
      </div>
      <div className="container d-flex carousel" ref={carousel}>
        {data.map((item) => {
          const { id, name, image } = item;
          return (
            <div className="item" key={id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} alt={name} />
                <Card.Body>
                  <Card.Title>Vespa</Card.Title>
                  <Card.Text>
                    Vespa
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Left" />
        </button>
        <button onClick={handleRightClick}>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Right" />
        </button>
      </div>
    </div>
  );
};

export default Motorcycles;
