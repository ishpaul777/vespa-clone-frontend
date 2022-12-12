//import ScooterAnimation from "../components/ScooterAnimation";
import "../styles/carrocel.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/products/products_reducer";
import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

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
      <div className="container d-flex carousel" ref={carousel}>
        {data.map((item) => {
          const { id, name, image_url, description } = item;
          return (
            <div className="item" key={id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={image_url} alt={name} />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <Link to={`/products/${id}`} className="btn btn-primary">
                    See Details
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          <img
            src="/static/images/216151_right_chevron_icon.png"
            alt="Scroll Left"
          />
        </button>
        <button onClick={handleRightClick}>
          <img
            src="/static/images/216151_right_chevron_icon.png"
            alt="Scroll Right"
          />
        </button>
      </div>
    </div >
  );
};

export default AllProducts;
