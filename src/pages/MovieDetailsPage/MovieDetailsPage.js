/* import - node_lodules */
import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import T from 'prop-types';
/* import - CSS */
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
      .then(data => {
        this.setState({ movie: data, error: null });
      })
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

    const obj = {};
    const makeCircle2 = (pesent, colorStroke, wh = 80, strokeWidth = 10) => {
      const cx = wh / 2;
      const cy = wh / 2;

      const radius = cx + 10 - strokeWidth * 2;

      const strokeDasharray = 2 * Math.PI * radius;

      const strokeDashoffset =
        strokeDasharray - (pesent / 100) * strokeDasharray;

      obj.width = wh;
      obj.height = wh;
      obj.strokeWidth = strokeWidth;
      obj.colorStroke = colorStroke;
      obj.cx = cx;
      obj.cy = cy;
      obj.radius = radius;
      obj.strokeDasharray = strokeDasharray;
      obj.strokeDashoffset = strokeDashoffset;

      return obj;
    };

    let needUrl;
    let allGenres;
    if (movie) {
      needUrl = checkPostImg(movie.poster_path, movie.backdrop_path);

      allGenres = movie.genres.map(genr => genr.name).join(', ');

      makeCircle2(movie.vote_average * 10, '#fff');
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
                Go back
              </button>

              {needUrl && (
                <img src={`https://image.tmdb.org/t/p/w300${needUrl}`} alt="" />
              )}

              <h3>
                {movie.title}{' '}
                {movie.release_date && movie.release_date.slice(0, 4)}
              </h3>

              <svg className="bar" width={obj.width} height={obj.height}>
                <circle
                  className={styles.circle}
                  stroke={obj.colorStroke}
                  fill="transparent"
                  strokeWidth={obj.strokeWidth}
                  cx={obj.cx}
                  cy={obj.cy}
                  r={obj.radius}
                  strokeDasharray={obj.strokeDasharray}
                  strokeDashoffset={obj.strokeDashoffset}
                />
              </svg>

              <p>{movie.vote_average}/10</p>

              <p>{movie.overview}</p>

              <p>Genres: {allGenres}.</p>

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
