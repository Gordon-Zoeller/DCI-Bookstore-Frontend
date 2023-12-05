import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/CreateContext";

function OneBook() {
  const { singleBook, setSingleBook, setCart, reviews, setReviews, user } = useContext(MyContext);
  const navigate = useNavigate();

  /* useEffect(() => {
    fetch(`http://localhost:8000/api/books/${bookId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setSingleBook(res.data);
          setReviews(res.data.reviews);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err));
  }, [bookId, setSingleBook]); */

  useEffect(() => {
    fetch(`http://localhost:8000/api/reviews/of-one-book/${singleBook._id}`)
    .then((res) => res.json())
    .then(res => {
      if (res.success) {
        setReviews(res.data);
      }
    })
    .catch(err => console.log(err))
  },[])
  
  
  const handleAddToCart = () => {
    setCart((prev) => [...prev, singleBook]);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const review = {
      book:singleBook._id,
      text:e.target.review.value,
      userId: user._id,
    }
    const token = localStorage.getItem("token");
    fetch ('http://localhost:8000/api/reviews/new', {method:"POST", headers:{"Content-Type": "application/json", "token": `${token}`},body:JSON.stringify(review)})
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        console.log(res.error)
      } else {
        e.target.review.value = ""
      }
    })
    .catch(err => console.log(err))

  };

  return (
    <>
      <div>
        <h3>{singleBook.title}</h3>
        <h2>{singleBook.author.firstName} {singleBook.author.lastName}</h2>
        <h2>{singleBook.year}</h2>
        <h2>{singleBook.price}</h2>
        <h2>{singleBook.publisher}</h2>
        <h2>{singleBook.ISBN}</h2>

        <img
          src="https://placeholder"
          alt="Book Cover"
        />
        <div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <div>
        <h2>Reviews</h2>

        <form onSubmit={(e) => handleAddReview(e)}>
          <textarea
          name="review"
          placeholder="Write your review here"

          />
          <button>submit</button>

        </form>
        <div>
          {
            reviews && reviews.map(review=>{
              return(
                <div key={review._id}>
                  <h3>{review.userId.firstName}</h3>
                  <p>{review.text}</p>
                </div>
              )
            })

          }
        </div>
        
      </div>
    </>
  );
}

export default OneBook;
