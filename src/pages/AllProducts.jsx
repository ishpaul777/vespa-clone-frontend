//import ScooterAnimation from "../components/ScooterAnimation";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/carrocel.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, removeProduct } from "../redux/products/products_reducer";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AllProducts = () => {
  const data = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.length) {
      dispatch(getProducts());
    }
  }, [dispatch]);


  var settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    className: 'slider_arrows',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (!data || !data.length) return null;


  return (
    <div className="container-fluid ">
    <h1 className="text-center mt-5"> PRODUCTS </h1>
    <Slider {...settings} >
      {data.map((item, index) => (
        <div  key={index} className="m-2">
          <Card className="m-1" >
            <Card.Img variant="top" src={item.image_url} alt={item.model} />
            <Card.Body className="text-center">
              <Card.Title>{item.model}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <div className="d-flex justify-content-center">
              <Link to={`/products/${item.id}`} className="btn btn-primary m-1" size="sm">See Details</Link>
                  {
                    user.role === 'admin' &&
                    <Button
                      onClick={() => { dispatch(removeProduct(item.id)) }}
                      className="btn btn-danger m-1" size="sm">
                      Remove
                    </Button>
                  }
              </div>
              
            </Card.Body>
          </Card>
        </div>
      ))}
    </Slider>
  </div>
  );
};

export default AllProducts;

