/*
export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      React homework template
    </div>
  );
};
*/

import React, { Component } from 'react';
//import css from "./Styles.module.css";
import { startSrch } from "../API/api"
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    searchResults: [],
  };

  /*handleButtonPress = evt => { }
  handleInput = evt => {
    const { value } = evt.target;
     this.setState({
       searchTerm: value,
     });
  }
*/

  /*
  handleSubmit = evt => {
    evt.preventDefault();

    const { value } = evt.target[1];
    const response = startSrch(value);
    //console.log(response);
    this.setState({ searchResults: response });

   
  };
  */

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = evt.target[1];
    startSrch(value).then(users => { 
      const response = users.hits;
      this.setState({ searchResults: response });
    });
    //console.log(response);
    
  };

  /*getResults = () => {
    const { searchTerm } = this.state;
    const response = startSrch(searchTerm);
     this.setState({ searchResults: response });
    
  };*/

  render() {
    const { searchResults } = this.state;

    return (
      <div
        /*style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}*/
      >
        <SearchBar
          onCompletion={this.handleSubmit}
        />
        <ImageGallery>
          <ImageGalleryItem results={searchResults} />
        </ImageGallery>
      </div>
    );
  }
}
