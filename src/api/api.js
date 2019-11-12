import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  // withCredentials: true,
  // headers: {
  //   api_key: '0a372659e0a2bc92523f188eb5e16ad2',
  // },
});

const apiKey = '0a372659e0a2bc92523f188eb5e16ad2';

export const homeAPI = {
  getTrendingToday() {
    return instance
      .get(`/trending/movie/day?api_key=${apiKey}`)
      .then(res => res.data)
      .catch(err => {
        console.log('ERROR homeAPI.getTrendingToday', err);
        throw err;
      });
  },
};

export const moviesAPI = {
  getSearchMovies(query) {
    return instance
      .get(
        `/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`,
      )
      .then(res => res.data)
      .catch(err => {
        console.log('ERROR moviesAPI.getSearchMovies', err);
        throw err;
      });
  },

  getSearchMovy(movieId) {
    return instance
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
      )
      .then(res => res.data)
      .catch(err => {
        console.log('ERROR moviesAPI.getSearchMovy', err);
        throw err;
      });
  },

  getCastInMovy(movieId) {
    return instance
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
      )
      .then(res => res.data)
      .catch(err => {
        console.log('ERROR moviesAPI.getSearchMovy', err);
        throw err;
      });
  },

  getReviewsInMovy(movieId) {
    return instance
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`,
      )
      .then(res => res.data)
      .catch(err => {
        console.log('ERROR moviesAPI.getSearchMovy', err);
        throw err;
      });
  },
};
