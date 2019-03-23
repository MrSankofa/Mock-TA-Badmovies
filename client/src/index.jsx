import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this);
    // you might have to do something important here!
  }

  componentDidMount() {
    var that = this;
    $.ajax({
      method: "GET",
      url: "/genres",
      success: function success (data){
        console.log(`loaded Genres`);
      }
    }).then(function(data){
      $.ajax({
        method: "GET",
        url: "/search",
        data: "War",
        success: function success (data){
          console.log(`loaded Search API query`);
          that.setState({
            movies: data,
            favorites: [{deway: "favorites"}],
            showFaves: false,
          })
        }
      })
    })
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    var searchPathEndPoint = '/search?' + genre;
    var that = this;
    axios(searchPathEndPoint).then(function(response){console.log('response from getMovies in index.js ', response)
      that.setState({
        movies: response.data,
        favorites: [{deway: "favorites"}],
        showFaves: false
      })
    }).catch((err) => console.error(err))
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search getMovies={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));