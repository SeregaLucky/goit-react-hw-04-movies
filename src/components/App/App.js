/* import - node_lodules */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
/* import - CSS */
import styles from './App.module.css';
/* import - routes */
import routes from '../../routes';
/* import - COMPONENT */
import Navigation from '../Navigation/Navigation';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';

/*
 * COMPONENT
 */
const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Navigation />

        <div className={styles.sectionChange}>
          <Switch>
            <Route exact path={routes.HOME} component={HomePage} />

            <Route
              path={routes.MOVIES_MODIES_ID}
              component={MovieDetailsPage}
            />
            <Route path={routes.MOVIES} component={MoviesPage} />

            <Redirect to={routes.HOME} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
