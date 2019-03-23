// 

const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/badmovies', { useNewUrlParser: true });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})

var Schema = mongoose.Schema;

var genreSchema = new Schema({
  genreId: {type: Number, unique:true},
  genreName: String
})

var movieSchema = new Schema({
  movieId: {type: Number, unique:true},
  poster_path: String,
  vote_average: Number,
  vote_count: Number,
  release_date: String,
  popularity: Number,
  title: String
})

var movies = mongoose.model('movies', movieSchema, 'movies');

var saveMovie = (movie) => {

  movies.findOneAndUpdate(
    { movieId: movie.id},
    {
      movieId: movie.id,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      release_date: movie.release_date,
      popularity: movie.popularity,
      title: movie.title
    },
    { upsert: true }
  ).exec().catch((err)=>console.error(err))
}

var deleteMovie = (movie) => {
  movies.findOneAndRemove(
    { movieId: movie.id}
  ).exec().catch(function(error){console.log(error)})
}

var getAllFavMovies = () => {
  return movies.find().exec().catch((err)=>console.error(err))
}

var genres = mongoose.model('genres', genreSchema, 'genres');

var saveGenres = (data) => {

   var results = data.map((genre) => {
    return genres.findOneAndUpdate(
      { genreId: genre.id },
      {
        genreId: genre.id,
        genreName: genre.name
      },
      { upsert: true }
    )
    .exec()
    .catch((err) => console.error(err));
  }) // end of map

  return Promise.all(results);    
} // end of saveGenres

var getGenreId = (targetGenre) => {
  return genres.findOne({ genreName: targetGenre}, 'genreId').exec();
}


module.exports = {
  db: db,
  saveGenres: saveGenres,
  getGenreId: getGenreId,
  saveMovie: saveMovie,
  deleteMovie: deleteMovie,
  getAllFavMovies: getAllFavMovies
}