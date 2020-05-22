import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen({ history }) {
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    history.push('payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                id='address'
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                id='city'
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                name='country'
                id='country'
                onChange={(e) => setCountry(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor='postalCode'>Postal Code</label>
              <input
                type='text'
                name='postalCode'
                id='postalCode'
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>
            <li>
              <button type='submit' className='button primary'>
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

ShippingScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.func,
  }).isRequired,
};

export default ShippingScreen;