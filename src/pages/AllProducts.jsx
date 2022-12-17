/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/products/products_reducer';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/carousel.css';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {

  const user = useSelector((state) => state.user);

  const data = useSelector((state) => state.products);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!data)
      dispatch(getProducts());
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

  if (!data || !data.length) return (
    <div className="container w-50 d-flex flex-column">
      <h1 className="text-center mt-5"> No Products to shop </h1>
      <p className="text-middle">
        <i>
          If you are a store admin, please add products to your store.
        </i>
      </p>
      {user && user.role === 'admin' && (
        <Link to="/addProduct" className="btn btn-primary">
          Add Products
        </Link>
      )}
    </div>
  )

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
