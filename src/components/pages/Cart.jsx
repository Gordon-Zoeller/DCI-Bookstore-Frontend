import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/CreateContext";

export default function Cart() {
  const { cart, setCart } = useContext(MyContext);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item._id !== itemToRemove._id);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total Price: </strong>${calculateTotalPrice()}
      </div>
    </div>
  );
}
