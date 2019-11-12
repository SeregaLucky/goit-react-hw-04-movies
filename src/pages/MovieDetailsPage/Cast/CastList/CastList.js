/* import - node_lodules */
import React from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './CastList.module.css';
/* import - AVATARS */
import menPng from '../../../../photos/avatar/men-min.png';
import womanPng from '../../../../photos/avatar/woman-min.png';

/*
 * COMPONENT
 */
const CastList = ({ allCast }) => {
  const checkPhoto = (profilePath, gender) => {
    if (profilePath) {
      return `https://image.tmdb.org/t/p/w200${profilePath}`;
    }
    if (gender === 2) {
      return menPng;
    }
    return womanPng;
  };

  return (
    <ul className={styles.listCast}>
      {allCast.map(cast => (
        <li key={cast.id} className={styles.itemCast}>
          <p>{cast.name}</p>
          <p>{cast.character}</p>
          <img
            src={checkPhoto(cast.profile_path, cast.gender)}
            alt=""
            style={{ height: 300 }}
          />
        </li>
      ))}
    </ul>
  );
};

CastList.propTypes = {
  allCast: T.arrayOf(
    T.shape({
      id: T.number.isRequired,
      name: T.string.isRequired,
      character: T.string.isRequired,
      gender: T.number.isRequired,
      profile_path: T.string,
    }).isRequired,
  ).isRequired,
};

export default CastList;
