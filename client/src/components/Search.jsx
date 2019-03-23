import React from 'react';
const axios = require('axios');

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: ''
    };

    this.getOptionValue = this.getOptionValue.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.getGenres = this.getGenres.bind(this);
  }

  componentDidMount(){
    this.getGenres();
  }

  getOptionValue(event) {
    console.log(event.target.value)
    var currentGenre = this.state.genres;
    this.setState({
      genres: currentGenre,
      selectedGenre: event.target.value
    })
  }

  handleSearchClick(){
    this.props.getMovies(this.state.selectedGenre)
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    var that = this;
    axios('/genres').then(function(response){
      that.setState({
        genres: response.data
      })
    }).catch((err => console.error(err)))
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.getOptionValue}>
          {this.state.genres.map( genre => { return <option value={genre.name} key={genre.id}>{genre.name}</option> })}
        </select>
        <br/><br/>

        <button onClick={this.handleSearchClick} >Search</button>

      </div>
    );
  }
}

export default Search;