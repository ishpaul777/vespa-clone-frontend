/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/products/products_reducer';

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = React.useState({
    model: '',
    color: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const validateFields = (form) => {
    if (form.image.files.length === 0) {
      return false;
    }
    if (product.model !== '' && product.color !== '' && product.price !== '' && product.description !== '') {
      return true;
    }
    return false;
  };

  const navigate = useNavigate();
  const submitToBackend = (formData) => {
    dispatch(addProduct(formData));
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (validateFields(e.target)) {
      formData.append('product[model]', product.model);
      formData.append('product[color]', product.color);
      formData.append('product[price]', product.price);
      formData.append('product[description]', product.description);
      formData.append('product[image]', e.target.image.files[0]);

      submitToBackend(formData);
      setProduct({
        model: '',
        color: '',
        price: '',
        description: '',
      });
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center h-100 mt-5">
      <h1>Add New Product</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="mt-3 add-product-form">
        <div className="mb-3 field">
          <label htmlFor="model" className="form-label">
            Model
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            value={product.model}
            name="model"
            id="model"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            value={product.color}
            name="color"
            id="color"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            value={product.price}
            name="price"
            id="price"
          />
        </div>
        <div>
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            className="form-control"
            type="file"
            multiple
            name="image"
            id="image"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            onChange={handleChange}
            name="description"
            value={product.description}
            id="description"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
