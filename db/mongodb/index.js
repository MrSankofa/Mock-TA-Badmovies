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
  getGenreId: getGenreId
}