/* import - node_lodules */
import React, { Component } from 'react';
import T from 'prop-types';
/* import - CSS */
// import styles from './Reviews.module.css';
/* import - API */
import { moviesAPI } from '../../../api/api';
/* import - COMPONENT */
import ReviewsList from './ReviewsList/ReviewsList';
import ErrorShow from '../../ErrorShow/ErrorShow';

/*
 * COMPONENT
 */
class Reviews extends Component {
  static propTypes = {
    movieId: T.string.isRequired,
  };

  state = {
    allReviews: null,
    arrayIdOpen: [],
    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props;

    moviesAPI
      .getReviewsInMovy(movieId)
      .then(data => this.setState({ allReviews: data.results, error: null }))
      .catch(error => this.setState({ error }));
  }

  addOpenReview = id => {
    this.setState(state => ({ arrayIdOpen: [...state.arrayIdOpen, id] }));
  };

  render() {
    const { allReviews, arrayIdOpen, error } = this.state;

    return (
      <>
        {allReviews && (
          <ReviewsList
            allReviews={allReviews}
            arrayIdOpen={arrayIdOpen}
            addOpenReview={this.addOpenReview}
          />
        )}

        {error && <ErrorShow />}
      </>
    );
  }
}

export default Reviews;
