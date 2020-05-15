import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='header'>
          <div className='brand'>
            <button type='button' onClick={openMenu}>
              &#9776;
            </button>
            <Link to='/'>Amazona</Link>
          </div>
          <div className='header-links'>
            <Link to='/cart'>Cart</Link>
            <Link to='/signin'>Sign In</Link>
          </div>
        </header>
        <aside className='sidebar'>
          <h3>Shopping Categories</h3>
          <button
            type='button'
            className='sidebar-close-button'
            onClick={closeMenu}
          >
            x
          </button>
          <ul>
            <li>
              <Link to='/categories/pants'>Pants</Link>
            </li>
            <li>
              <Link to='/categories/shirts'>Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className='main'>
          <div className='content'>
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/' exact component={HomeScreen} />
          </div>
        </main>
        <footer className='footer'>Copyright © All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
