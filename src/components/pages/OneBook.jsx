import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/CreateContext';

function OneBook() {
  const { singleBook, setSingleBook, setCart, reviews, setReviews, user } =
    useContext(MyContext);

    useEffect(() => {
      const singleBookFromLocalStorage = localStorage.getItem("singleBook");
    if(singleBookFromLocalStorage) {
      fetch(`http://localhost:8000/api/books/bookbyid/${singleBookFromLocalStorage}`)
      .then(res => res.json())
      .then(res => {setSingleBook(res.data); console.log("hello world")})
      .catch(err => console.log(err));
  
      fetch(`http://localhost:8000/api/reviews/of-one-book/${singleBookFromLocalStorage}`)
                      .then((res) => res.json())
                      .then(res => {
                        if (res.success) {
                          setReviews(res.data);
                        }
                      })
                      .catch(err => console.log(err))
    }
    }, []);

  const handleAddToCart = () => {
    setCart((prev) => [...prev, singleBook]);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const review = {
      book: singleBook._id,
      text: e.target.review.value,
      firstName: user.firstName,
      userId: user._id,
    };
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/reviews/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: `${token}` },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          e.target.review.value = '';
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(singleBook)
  return (
    <>
      <div>
        <h3>{singleBook.title}</h3>
        <h2>
          {singleBook?.author?.firstName} {singleBook?.author?.lastName}
  </h2>
        <div className='book-img-container'>
          <img src={singleBook.thumbnail} alt='book cover' />
        </div>
        <h2>{singleBook.year}</h2>
        <h2>{singleBook.price}</h2>
        <h2>{singleBook.publisher}</h2>
        <h2>{singleBook.ISBN}</h2>
        <div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <div>
        <h2>Reviews</h2>

        <form onSubmit={(e) => handleAddReview(e)}>
          <textarea name='review' placeholder='Write your review here' />
          <button>submit</button>
        </form>
        <div>
          {reviews &&
            reviews.map((review) => {
              return (
                <div key={review._id}>
                  <h3>{review?.userId?.firstName}</h3>
                  <p>{review.text}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default OneBook;
{/*<h3>{review.userId.firstName}</h3>*/}