import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GiHouseKeys } from 'react-icons/gi';
import { FaArrowLeft } from 'react-icons/fa';
import { getProducts } from '../redux/products/products_reducer';
import ScooterAnimation from '../components/ScooterAnimation';

function ProductDetails() {
  // get the id from the url
  let { id } = useParams();

  id = parseInt(id, 10);
  // get the product from the store if it exists else fetch product from the server
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  if (products.length === 0) {
    dispatch(getProducts());
  }
  // find the product with the id
  const product = products.find((product) => product.id === id);

  if (!product) {
    return (
      <div>
        <ScooterAnimation />
      </div>
    );
  }

  const financers = [
    {
      name: 'HDFC',
      monthly_emi: 1000,
      interest_rate: 10,
    },
    {
      name: 'ICICI',
      monthly_emi: 1200,
      interest_rate: 12,
    },
    {
      name: 'SBI',
      monthly_emi: 1100,
      interest_rate: 11,
    },
  ];

  return (
    <div className="details-page-container d-flex h-100 justify-content-center align-items-center">
      <div className="product-img-container">
        <img src={product.image_url} alt={product.name} className="product_image" />
      </div>
      <div className="product-details">
        <h1>{product.model}</h1>
        <p>
          <i>
            <strong className="product-price">
              ₹
              {product.price}
              {' '}
              Ex-showroom price
            </strong>
            {' '}
            <br />
            EMI starting from ₹
            {financers[0].monthly_emi}
            {' '}
            / month
            Number of EMI: 6, 12, 18, 24, 30, 36
          </i>
        </p>
        <h3>Details that matters</h3>
        <p>{product.description}</p>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Financer</th>
              <th scope="col">Monthly EMI</th>
              <th scope="col">Interest Rate</th>
            </tr>
          </thead>
          <tbody>
            {financers.map((financer) => (
              <tr key={financer.name}>
                <td>{financer.name}</td>
                <td>{financer.monthly_emi}</td>
                <td>{financer.interest_rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          to={`/reservation/${product.id}`}
          className="btn btn-primary btn-lg"
        >
          Book Test Ride
          <GiHouseKeys />
        </Link>
        <Link
          to="/"
          className="text-decoration-none btn btn-pill d-block"
          style={{
            float: 'left',
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            border: '1px solid #97bf0f',
            backgroundColor: '#97bf0f',
            color: '#fff',
          }}
        >
          <FaArrowLeft />
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
