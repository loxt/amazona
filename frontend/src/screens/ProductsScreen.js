import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from '../actions/productActions';

function ProductsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const productDelete = useSelector((state) => state.productDelete);

  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts);
  }, [successSave, successDelete, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setRating(product.rating);
    setNumReviews(product.numReviews);
  };

  return (
    <div className='content content-margined'>
      <div className='product-header'>
        <h3>Products</h3>
        <button
          className='button primary'
          type='button'
          onClick={() => openModal({})}
        >
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>Create product</h2>
              </li>
              <li>{loadingSave && <div>Loading...</div>}</li>
              <li>{errorSave && <div>{errorSave}</div>}</li>
              <li>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='price'>Price</label>
                <input
                  type='text'
                  name='price'
                  id='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='image'>Image</label>
                <input
                  type='text'
                  name='image'
                  id='image'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='Brand'>Brand</label>
                <input
                  type='text'
                  name='Brand'
                  id='Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='countInStock'>Count in stock</label>
                <input
                  type='text'
                  name='countInStock'
                  id='countInStock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='category'>Category</label>
                <input
                  type='text'
                  name='category'
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>
              <li>
                <button type='submit' className='button primary'>
                  {id ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={() => setModalVisible(false)}
                  type='button'
                  className='button secondary'
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className='product-list'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className='button'
                    type='button'
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>{' '}
                  <button
                    className='button'
                    type='button'
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsScreen;
