import axios from 'axios';

const api = axios.create({
   baseURL: 'https://api.themoviedb.org/3/',
   headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`,
   },
});

export default api;
