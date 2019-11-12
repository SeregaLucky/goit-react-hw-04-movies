/* import - node_lodules */
import React, { Component } from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './MoviesPage.module.css';
/* import - API */
import { moviesAPI } from '../../api/api';
/* import - COMPONENT */
import MoviesPageList from './MoviesPageList/MoviesPageList';
import ErrorShow from '../ErrorShow/ErrorShow';

/*
 * COMPONENT
 */
class MoviesPage extends Component {
  static propTypes = {
    location: T.shape().isRequired,
    history: T.shape().isRequired,
    match: T.shape().isRequired,
  };

  state = {
    value: '',
    allSearchMovies: [],
    error: null,
  };

  componentDidMount() {
    const { location } = this.props;

    const query = new URLSearchParams(location.search).get('query');

    if (query) {
      this.getFetchingAllMovies(query);
    }
  }

  changeValue = ({ target }) => this.setState({ value: target.value });

  handleSubmit = e => {
    e.preventDefault();

    const query = e.currentTarget.children.query.value;

    this.getFetchingAllMovies(query);
  };

  getFetchingAllMovies = query => {
    const { location, history } = this.props;

    moviesAPI
      .getSearchMovies(query)
      .then(data => {
        this.setState({
          allSearchMovies: data.results,
          error: null,
        });
        history.push({
          ...location,
          search: `query=${query}`,
        });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { location, match } = this.props;
    const { value, allSearchMovies, error } = this.state;

    return (
      <section className={styles.sectionPage}>
        <div className={styles.container}>
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <input
              className={styles.inputForm}
              type="text"
              value={value}
              onChange={this.changeValue}
              name="query"
            />
            <button type="submit" className={styles.btnForm}>
              Search
            </button>
          </form>

          {allSearchMovies.length > 0 && (
            <MoviesPageList
              allSearchMovies={allSearchMovies}
              location={location}
              match={match}
            />
          )}

          {error && <ErrorShow />}
        </div>
      </section>
    );
  }
}

export default MoviesPage;
