/* import - node_lodules */
import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
/* import - CSS */
import styles from './MoviesPageList.module.css';

/*
 * COMPONENT
 */
const MoviesPageList = ({ allSearchMovies, location, match }) => {
  return (
    <ul className={styles.list}>
      {allSearchMovies.map(movy => (
        <li key={movy.id}>
          <Link
            to={{
              pathname: `${match.url}/${movy.id}`,
              state: { from: location },
            }}
          >
            {movy.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesPageList.propTypes = {
  allSearchMovies: T.arrayOf(
    T.shape({
      id: T.number.isRequired,
      title: T.string.isRequired,
    }).isRequired,
  ).isRequired,

  location: T.shape().isRequired,
  match: T.shape().isRequired,
};

export default MoviesPageList;
