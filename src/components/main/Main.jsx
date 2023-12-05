import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Cart from "../pages/Cart";
function Main() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}
export default Main;
