/* import - node_lodules */
import React, { Component } from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './HomePage.module.css';
/* import - API */
import { homeAPI } from '../../api/api';
/* import - COMPONENT */
import HomePageList from './HomePageList/HomePageList';
import ErrorShow from '../ErrorShow/ErrorShow';

/*
 * COMPONENT
 */
class HomePage extends Component {
  static propTypes = {
    location: T.shape().isRequired,
  };

  state = {
    allTrendingToday: [],
    error: null,
  };

  componentDidMount() {
    homeAPI
      .getTrendingToday()
      .then(data => {
        this.setState({
          allTrendingToday: data.results,
          error: null,
        });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { location } = this.props;
    const { allTrendingToday, error } = this.state;

    return (
      <section className={styles.sectionPage}>
        <div className={`${styles.container} ${styles.containerPadding}`}>
          <h2 className={styles.titlePage}>Trending today</h2>

          {allTrendingToday.length > 0 && (
            <HomePageList
              allTrendingToday={allTrendingToday}
              location={location}
            />
          )}

          {error && <ErrorShow />}
        </div>
      </section>
    );
  }
}

export default HomePage;
