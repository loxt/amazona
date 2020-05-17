import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen({ match, location, history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [qty, dispatch, productId]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/signin?redirect=shipping');
  };

  return (
    <div className='cart'>
      <div className='cart-list'>
        <ul className='cart-list-container'>
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.id + 1}>
                <div className='cart-image'>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className='cart-name'>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, parseInt(e.target.value, 10))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type='button'
                      className='button'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className='cart-price'>
                  <b>${item.price}</b>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className='cart-action'>
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          type='button'
          onClick={checkoutHandler}
          className='button primary full-width'
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

CartScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CartScreen;
