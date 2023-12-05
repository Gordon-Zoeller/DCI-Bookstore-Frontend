import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Books from '../pages/Books';
import OneBook from '../pages/OneBook';
import Cart from '../pages/Cart';

function Main() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/:search' element={<OneBook />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' />
        </Routes>
      </main>
    </>
  );
}

export default Main;
