/* import - node_lodules */
import React from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './ReviewsList.module.css';

const ReviewsList = ({ allReviews, arrayIdOpen, addOpenReview }) => (
  <>
    {/* If have info */}
    {allReviews.length > 0 && (
      <ul className={styles.listReviews}>
        {allReviews.map(review =>
          !arrayIdOpen.find(id => id === review.id) ? (
            <li key={review.id} className={styles.itemReviews}>
              <h3 className={styles.title}>{review.author}</h3>

              {review.content.length >= 500 ? (
                <>
                  <p>{review.content.slice(0, 500)}...</p>
                  <button
                    type="button"
                    onClick={() => addOpenReview(review.id)}
                  >
                    More
                  </button>
                </>
              ) : (
                <p>{review.content}</p>
              )}
            </li>
          ) : (
            <li key={review.id} className={styles.itemReviews}>
              <h3 className={styles.title}>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ),
        )}
      </ul>
    )}

    {/* If not have info */}
    {allReviews.length === 0 && <p>Not info</p>}
  </>
);

ReviewsList.propTypes = {
  allReviews: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      author: T.string.isRequired,
      content: T.string.isRequired,
    }),
  ).isRequired,

  arrayIdOpen: T.arrayOf(T.string).isRequired,
  addOpenReview: T.func.isRequired,
};

export default ReviewsList;
