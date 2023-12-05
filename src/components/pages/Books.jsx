import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/CreateContext';

function Books() {
  const { books, setBooks, setSingleBook, setCart } = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8000/api/books')
      .then((res) => res.json())
      .then((res) => {
        res.success && setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const searchBook = (e) => {
    e.preventDefault();
    if (e.target.search.value !== '') {
      fetch(`http://localhost:8000/api/books/search/${e.target.search.value}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setSingleBook(res.data);
            navigate(`/books/${e.target.search.value}`);
            e.target.search.value = '';
          }
        })
        .catch((err) => console.log(err));
    }
    e.target.search.value = '';
  };
  return (
    <>
      <h2>Books</h2>
      <form onSubmit={(e) => searchBook(e)}>
        <input type='text' name='search' id='search' />
        <button type='submit'>search</button>
      </form>
      <div>
        {books.map((book) => {
          return (
            <>
              <div key={book._id}>
                <h3>{book.title}</h3>
                <h3>
                  {book.author.firstName} {book.author.lastName}
                </h3>
                <h4>{book.year}</h4>
                <h4>{book.publisher}</h4>
                <h4>${book.price}</h4>
                <button
                  onClick={() => {
                    setSingleBook(book);
                    navigate(`/books/${book.title}`);
                  }}
                >
                  <NavLink>read reviews</NavLink>
                </button>
                <button onClick={() => setCart((prev) => [...prev, book])}>
                  add to cart
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Books;
