import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/productCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../redux/products/products_reducer';

const ProductCard = (item) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const showDetailsPage = (id) => {
    navigate(`/products/${id}`);
  };

  const { product } = item;
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <div>
        <div className="product-background">
          <div className="card-top">
            <img className="product-img-main" src={product.image_url} alt={product.name} />
          </div>
        </div>
        <div className="card-bottom d-flex flex-column justify-content-center align-items-center">
          <h3 className="productname">{product.model}</h3>
          <hr className="w-75 mt-2" />
          <p className="w-75 text-center">
            Starting at
            <strong>
              {' '}
              $
              {product.price}
              {' '}
              {' '}
            </strong>
            Ex-showroom price
          </p>
          <div className="actions-card">
            <div className="mb-2 social-handle">
              <FaFacebook className="fa fs-5 fa-facebook-f" />
              <FaTwitter className="fa fs-5 fa-twitter" />
              <FaInstagram className="fa fs-5 fa-instagram" />
            </div>
            <button type="button" onClick={() => showDetailsPage(product.id)} className="btn btn-primary m-2">Know More</button>
            {
              user.role === 'admin'
              && (
              <button
                onClick={() => dispatch(removeProduct(product.id))}
                type="button"
                className="btn btn-danger m-2"
              >
                Delete Listing
              </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
