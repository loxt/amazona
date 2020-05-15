import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen({ match }) {
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  const { id } = match.params;

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className='back-to-result'>
        <Link to='/'>Back to result</Link>
      </div>
      {loading || error ? (
        <div>Loading...</div>
      ) : (
        <div className='details'>
          <div className='details-image'>
            <img src={product.image} alt={product.name} />
          </div>
          <div className='details-info'>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} Reviews)
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className='details-action'>
            <ul>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Status:
                {product.status}
              </li>
              <li>
                Qty:
                <select>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                </select>
              </li>
              <li>
                <button type='button' className='button primary'>
                  Add to Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

ProductScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductScreen;
