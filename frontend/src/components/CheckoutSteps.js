import React from 'react';
import PropTypes from 'prop-types';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className='checkout-steps'>
      <div className={step1 ? 'active' : ''}>Signin</div>
      <div className={step2 ? 'active' : ''}>Shipping</div>
      <div className={step3 ? 'active' : ''}>Payment</div>
      <div className={step4 ? 'active' : ''}>Place Order</div>
    </div>
  );
}

CheckoutSteps.propTypes = {
  step1: PropTypes.string,
  step2: PropTypes.string,
  step3: PropTypes.string,
  step4: PropTypes.string,
};

CheckoutSteps.defaultProps = {
  step1: '',
  step2: '',
  step3: '',
  step4: '',
};

export default CheckoutSteps;
