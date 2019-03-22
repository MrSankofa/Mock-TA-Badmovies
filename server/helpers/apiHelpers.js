const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file
// genres `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US` 
// top rated `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1` 
// https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.asc&with_genres=10752&&include_adult=false&include_video=false&page=1 
// 02f2c194ac325057b7389b24402a11f2

// Don't forget to export your functions and require them within your server file