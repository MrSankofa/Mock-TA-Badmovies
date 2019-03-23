import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)
    
    this.handleMovieClick = this.handleMovieClick.bind(this)
  }

  handleMovieClick(movie) {
    console.log('this is the movie ', movie)
    this.props.saveMovie(movie);
  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx) 

  render() {
    return (
      <ul className="movies">

         {this.props.movies.map( (movie, index) => {
          //  if ( movie.poster_path === null ){
          //    movie.poster_path = 'https://images-na.ssl-images-amazon.com/images/I/513SU-W8JjL.jpg'
          //  } else {
          //   movie.poster_path = "https://image.tmdb.org/t/p/original/"+movie.poster_path
          //  }
          //  var that = this; 
            return (
              <li  onClick={() => {this.handleMovieClick(movie)}} className="movie_item" key={index}>
                <img src={"https://image.tmdb.org/t/p/original/"+movie.poster_path} />
                
                <div className="movie_description">
                  <h6>{movie.overview}</h6>
                  <section className="movie_details">
                    <div className="movie_year">
                      <span className="title">Year</span>
                      <span>{movie.release_date.slice(0,4)}</span>
                    </div>
                    <div className="movie_rating">
                      <span className="title">Rating</span>
                      <span>{movie.vote_average}</span>
                    </div>
                    {/* <button  > Favorite </button> */}
                  </section>
                </div>
              </li>
            )
          })}
      </ul>
    );
  }
}

export default Movies;