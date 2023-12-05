import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../../context/CreateContext';
import toast, { Toaster } from 'react-hot-toast';

function Links() {
  const { user, setUser } = useContext(MyContext);

  const handleLogout = () => {
    toast.success('logout successful!');

    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('token');
    }, 1500);
  };

  return (
    <>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/books'>Books</NavLink>
        </li>
        {user ? (
          <>
            {/* 'successful logout' pop-up: */}
            <Toaster position='top-center' />

            <li>
              <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li onClick={handleLogout}>
              <NavLink to='/'>Logout</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to='/cart'>Cart</NavLink>
        </li>
      </ul>
    </>
  );
}

export default Links;
