/* import - node_lodules */
import React, { Component } from 'react';
import T from 'prop-types';
/* import - CSS */
// import styles from './Cast.module.css';
/* import - API */
import { moviesAPI } from '../../../api/api';
/* import - COMPONENT */
import CastList from './CastList/CastList';
import ErrorShow from '../../ErrorShow/ErrorShow';

/*
 * COMPONENT
 */
class Cast extends Component {
  static propTypes = {
    movieId: T.string.isRequired,
  };

  state = {
    allCast: null,
    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props;

    moviesAPI
      .getCastInMovy(movieId)
      .then(data => this.setState({ allCast: data.cast, error: null }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { allCast, error } = this.state;

    return (
      <>
        {allCast && <CastList allCast={allCast} />}

        {error && <ErrorShow />}
      </>
    );
  }
}
export default Cast;
