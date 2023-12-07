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
            console.log(res.data);
            localStorage.setItem('singleBook', res.data[0]._id);
            navigate(`/books/${e.target.search.value}`);
            //e.target.search.value = '';
          }
        })
        .catch((err) => console.log(err));
    }
    //e.target.search.value = '';
  };
  return (
    <>
      <h2>Books</h2>
      <form onSubmit={(e) => searchBook(e)}>
        <input type='text' name='search' id='search' />
        <button type='submit'>search</button>
      </form>
      <div className='books-container'>
        {books.map((book) => {
          return (
            <>
              <div key={book._id} className='single-book-container'>
                <h3 className='book-title'>{book.title}</h3>
                <h3>
                  {book.author.firstName} {book.author.lastName}
                </h3>
                <div className='book-img-container'>
                  <img src={book.thumbnail} alt='book cover' />
                </div>

                <h4>{book.year}</h4>
                <h4>{book.publisher}</h4>
                <h4>${book.price}</h4>
                <button
                  onClick={() => {
                    setSingleBook(book);
                    localStorage.setItem('singleBook', book._id);
                    let bookTitle = book.title.split();

                    let joinedBookTitle = bookTitle.join();
                    console.log(joinedBookTitle);
                    navigate(`/books/${joinedBookTitle}`);
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
