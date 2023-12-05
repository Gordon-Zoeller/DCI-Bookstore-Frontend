import React from "react";

export default function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome To Our Online Bookstore!</h1>
        <h3>Find your next great Books with us.</h3>
      </header>

      <footer>
        <p>Contact Us: email@example.com</p>
        <p>&copy; {new Date().getFullYear()} Our Online Bookstore</p>
      </footer>
    </div>
  );
}
