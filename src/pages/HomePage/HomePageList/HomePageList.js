/* import - node_lodules */
import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';
/* import - CSS */
import styles from './HomePageList.module.css';
/* import - routes */
import routes from '../../../routes';

/*
 * COMPONENT
 */
const HomePageList = ({ allTrendingToday, location }) => {
  return (
    <ul className={styles.list}>
      {allTrendingToday.map(trend => (
        <li key={trend.id}>
          <Link
            to={{
              pathname: `${routes.MOVIES}/${trend.id}`,
              state: { from: location },
            }}
          >
            {trend.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

HomePageList.propTypes = {
  allTrendingToday: T.arrayOf(
    T.shape({
      id: T.number.isRequired,
      title: T.string.isRequired,
    }).isRequired,
  ).isRequired,

  location: T.shape().isRequired,
};

export default HomePageList;
