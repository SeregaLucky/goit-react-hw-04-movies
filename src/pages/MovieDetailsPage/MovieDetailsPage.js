/* import - node_lodules */
import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import T from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
/* import - CSS */
import 'react-circular-progressbar/dist/styles.css';
import styles from './MovieDetailsPage.module.css';
/* import - API */
import { moviesAPI } from '../../api/api';
/* import - routes */
import routes from '../../routes';
/* import - COMPONENT */
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';
import ErrorShow from '../ErrorShow/ErrorShow';

/*
 * COMPONENT
 */
class MovieDetailsPage extends Component {
  static propTypes = {
    match: T.shape().isRequired,
    location: T.shape().isRequired,
    history: T.shape().isRequired,
  };

  state = {
    movie: null,
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;

    moviesAPI
      .getSearchMovy(movieId)
      .then(data => this.setState({ movie: data, error: null }))
      .catch(error => this.setState({ error }));
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state) {
      history.push({
        ...location.state.from,
      });
      return;
    }

    history.push('/movies');
  };

  render() {
    const { match, location } = this.props;
    const { movie, error } = this.state;
    const { movieId } = match.params;

    const checkPostImg = (posterPath, backdropPath) => {
      if (posterPath) {
        return posterPath;
      }
      if (backdropPath) {
        return backdropPath;
      }
      return null;
    };

    let needUrl;
    let allGenres;
    let percentage;
    if (movie) {
      needUrl = checkPostImg(movie.poster_path, movie.backdrop_path);

      allGenres = movie.genres.map(genr => genr.name).join(', ');

      percentage = movie.vote_average * 10;
    }

    return (
      <>
        {movie && (
          <section className={styles.sectionPage}>
            <div className={styles.container}>
              <button
                className={styles.btnBack}
                type="button"
                onClick={this.handleGoBack}
              >
                &larr; Go back
              </button>

              <div className={styles.infoMain}>
                {needUrl && (
                  <div className={styles.posterImgCont}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${needUrl}`}
                      alt=""
                    />
                  </div>
                )}

                <div className={styles.textMain}>
                  <h3 className={styles.title}>
                    {movie.title}{' '}
                    {movie.release_date && movie.release_date.slice(0, 4)}
                  </h3>
                  <div style={{ width: 80 }}>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      strokeWidth={14}
                      styles={buildStyles({
                        textColor: '#fff',
                        // textColor: `hsl(${percentage}, 100%, 50%)`,
                        trailColor: '#fff',
                        // pathColor: `rgba(8, 198, 8, ${percentage / 100})`,
                        pathColor: `hsl(${percentage}, 100%, 50%)`,
                        textSize: '28px',
                        strokeLinecap: 'butt',
                      })}
                    />
                  </div>

                  {/* <p>{movie.vote_average}/10</p> */}
                  <p>{movie.overview}</p>
                  <p>Genres: {allGenres}.</p>
                </div>
              </div>

              <ul className={styles.listMoreInfo}>
                <li className={styles.itemMoreInfo}>
                  <NavLink
                    className={styles.linkMoreInfo}
                    activeClassName={styles.linkMoreInfoActive}
                    to={{
                      pathname: `${match.url}${routes.CAST}`,
                      state: location.state,
                    }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={styles.itemMoreInfo}>
                  <NavLink
                    className={styles.linkMoreInfo}
                    activeClassName={styles.linkMoreInfoActive}
                    to={{
                      pathname: `${match.url}${routes.REVIEWS}`,
                      state: location.state,
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>

              <Switch>
                <Route
                  path={`${match.path}${routes.CAST}`}
                  render={() => <Cast movieId={movieId} />}
                />
                <Route
                  path={`${match.path}${routes.REVIEWS}`}
                  render={() => <Reviews movieId={movieId} />}
                />
              </Switch>
            </div>
          </section>
        )}

        {error && <ErrorShow />}
      </>
    );
  }
}

export default MovieDetailsPage;
