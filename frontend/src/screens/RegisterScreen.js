import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/userActions';

function RegisterScreen({ history, location }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setRePassword] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <li>
            <h2>Register</h2>
          </li>
          <li>{loading && <div>Loading...</div>}</li>
          <li>{error && <div>{error}</div>}</li>
          <li>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor='rePassword'>Confirm password</label>
            <input
              type='password'
              name='rePassword'
              id='rePassword'
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <button type='submit' className='button primary'>
              Register
            </button>
          </li>
          <li>
            Already have an account?
            <Link
              to={redirect === '/' ? 'signin' : `signin?redirect=${redirect}`}
            >
              SignIn
            </Link>
          </li>
          <li>
            <Link to='/' className='button secondary text-center'>
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

RegisterScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.func,
  }).isRequired,
};

export default RegisterScreen;
