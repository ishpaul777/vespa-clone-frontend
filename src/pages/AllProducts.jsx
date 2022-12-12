//import ScooterAnimation from "../components/ScooterAnimation";
import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import "../styles/carrocel.css";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/products/products_reducer";
import { FaBorderNone, FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const AllProducts = () => {
  const data = useSelector((state) => state.products);
  const carousel = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(data);

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
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <h1>Last Products</h1>
      </div>
      <div className="d-flex justify-content-center">
        <h6>Please select a Product</h6>
      </div>
      <div className="d-flex mt-5">
        <div className="arrows">
          <button onClick={handleRightClick}>
            <FaChevronCircleLeft size={40} fill='#97bf0f' />
          </button>
        </div>
        <div className="d-flex carousel" ref={carousel}>

          {data.map((item) => {
            const { id, model, image_url, description } = item;
            return (
              <div className="container d-flex justify-content-center" key={id}>
                <CardGroup>
                  <Card className="border border-1 shadow p-2 mb-2 bg-body rounded" style={{ width: "14rem" }} >
                    <Card.Img variant="top" src={image_url} alt={model} />
                    <Card.Body className="col text-center">
                      <Card.Title>{model}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                  </Card>
                </CardGroup>
              </div>
            );
          })}

        </div>



        <div className="arrows">
          <button onClick={handleLeftClick}>
            <FaChevronCircleRight size={40} fill='#97bf0f' style={{
              background: '#fff',
              border: 0
            }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
