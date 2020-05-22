import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen({ history }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    history.push('placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <input
                type='radio'
                name='paymentMethod'
                id='paymentMethod'
                value='paypal'
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor='paymentMethod'>Paypal</label>
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

PaymentScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.func,
  }).isRequired,
};

export default PaymentScreen;
