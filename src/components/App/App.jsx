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
import { loadSrch } from '../API/api';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';


export class App extends Component {
  state = {
    searchResults: [],
  };

  componentDidMount() {
    startSrch("Code").then(users => {
      const response = users.hits;
      this.setState({ searchResults: response });
    });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = evt.target[1];
    this.setState({ isLoading: true });
    startSrch(value).then(users => {
      const response = users.hits;
      const totalResponse = users.totalHits;
      console.log(users.totalHits);
      if (totalResponse < 12) {
        alert("No more pictures");
        this.setState({fewResponse: true}) //If page is not refreshed this stays true(even when false), hence the need for the else{}
      }
      else {
        this.setState({ fewResponse: false});
      }
      this.setState({
        searchResults: response,
        searchTerm: value,
        pageItems: 12,
        didUserSearch: true,
        resultsAmount: totalResponse,
        isLoading: false
      });
    });
    //console.log(response);
  };

  handleButtonPress = evt => {
    const { searchTerm } = this.state;
    const { pageItems } = this.state;
    //const { searchResults } = this.state;
    const { resultsAmount } = this.state;
    let storageVar = pageItems;
    storageVar += 12;
    if (storageVar > resultsAmount) {
      alert('No more pictures');
      //evt.target.style.display = 'none';
      this.setState({ fewResponse: true });
    }
    this.setState({ isLoading: true });
    loadSrch(searchTerm, storageVar).then(users => {
       const response = users.hits;
       this.setState({
         searchResults: response,
         pageItems: storageVar,
         isLoading: false
       });
     });
  }

  render() {
    const { searchResults } = this.state;
    const { didUserSearch } = this.state;
    const { fewResponse } = this.state;
    const { isLoading } = this.state;

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
        <SearchBar onCompletion={this.handleSubmit} />
        <ImageGallery gallery={searchResults} isLoading={isLoading}>
          <ImageGalleryItem results={searchResults} />
        </ImageGallery>
        <Loader isLoading={isLoading}/>
        <Button
          results={searchResults}
          ifUserSearched={didUserSearch}
          onPress={this.handleButtonPress}
          iflessResponse={fewResponse}
        />
      </div>
    );
  }
}
