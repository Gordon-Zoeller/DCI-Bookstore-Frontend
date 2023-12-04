import { useState, useEffect } from 'react';
import { MyContext } from './CreateContext';

export default function Container({ children }) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //on load
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:8000/api/users/verifytoken', {
        method: 'GET',
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setUser(result.data);
          } else {
            console.log(result.message);
          }
        });
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        books,
        setBooks,
        reviews,
        setReviews,
        orders,
        setOrders,
        cart,
        setCart,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
