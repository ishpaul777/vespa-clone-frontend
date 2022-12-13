//import ScooterAnimation from "../components/ScooterAnimation";
import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/carrocel.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, removeProduct } from "../redux/products/products_reducer";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const data = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const carousel = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.length) {
      dispatch(getProducts());
    }
  }, [dispatch]);


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
            const { id, name, image_url, description } = item;
            return (
              <div className="container d-flex justify-content-center" key={id}>
                <Card style={{ width: "14rem" }}>
                  <Card.Img variant="top" src={image_url} alt={name} />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Link to={`/products/${id}`} className="btn btn-primary">See Details</Link>
                    {
                      user.role === 'admin' &&
                      <Button
                        onClick={() => { dispatch(removeProduct(id)) }}
                        className="btn btn-danger">
                        Remove
                      </Button>
                    }
                  </Card.Body>
                </Card>
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

