// import ScooterAnimation from "../components/ScooterAnimation";
import { useEffect } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { getProducts } from '../redux/products/products_reducer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/carousel.css';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);

  useEffect(() => {
    if (!data) {
      dispatch(getProducts());
    }
  }, []);

  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    cssEase: 'linear',
    slidesToShow: 3,
    className: 'slider_arrows',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!data || !data.length) return null;

  return (
    <div className="container w-100 d-flex flex-column">
      <h1 className="text-center mt-5"> PRODUCTS </h1>
      <div className="all-products-container">
        <Slider {...settings}>
          {data.map((item, index) => (
            <ProductCard
              product={item}
              key={index}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AllProducts;
