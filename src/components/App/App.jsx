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
import { Modal } from '../Modal/Modal';
import Notiflix from 'notiflix';


export class App extends Component {
  state = {
    searchResults: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    startSrch('Artificial Intelligence')
      .then(users => {
        const response = users.hits;
        this.setState({
          searchResults: response,
        });
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 2000);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        this.setState({ isLoading: false });
        console.error(`Error message ${error}`);
      });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = evt.target[0];
    
     evt.target[1].style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target[1].style.boxShadow = '0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 10px 12px -6px rgba(0, 0, 0, 0.4)';
     }, 2000);
    this.setState({ isLoading: true });
    startSrch(value)
      .then(users => {
        const response = users.hits;
        const totalResponse = users.totalHits;
        console.log(users.totalHits);
        if (totalResponse !== 0) {
          Notiflix.Notify.success(
            `Hooray! We found ${users.totalHits} images.`
          );
        }
        if (totalResponse === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (totalResponse < 12 && totalResponse !== 0) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
          this.setState({ fewResponse: true }); //If page is not refreshed this stays true(even when false), hence the need for the else{}
        } else {
          this.setState({ fewResponse: false });
        }
        this.setState({
          searchResults: response,
          searchTerm: value,
          pageItems: 12,
          didUserSearch: true,
          resultsAmount: totalResponse,
        });
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 2000);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        this.setState({ isLoading: false });
        console.error(`Error message ${error}`);
      });
    //console.log(response);
  };

  handleButtonPress = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow =
        '0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 10px 12px -6px rgba(0, 0, 0, 0.4)';
    }, 2000);
    const { searchTerm } = this.state;
    const { pageItems } = this.state;
    //const { searchResults } = this.state;
    const { resultsAmount } = this.state;
    let storageVar = pageItems;
    storageVar += 12;
    if (storageVar > resultsAmount) {
       Notiflix.Notify.warning(
         "We're sorry, but you've reached the end of search results."
       );
      //evt.target.style.display = 'none';
      this.setState({ fewResponse: true });
    }
    this.setState({ isLoading: true });
    loadSrch(searchTerm, storageVar)
      .then(users => {
        const response = users.hits;
        this.setState({
          searchResults: response,
          pageItems: storageVar,
        });
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 2000);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        this.setState({ isLoading: false });
        console.error(`Error message ${error}`);
      });
  };

  handleImageClick = evt => {
    const value = evt.target.name;
    const altValue = evt.target.alt;
    console.log(altValue);
    this.setState({
      fullImage: value,
      imageAlt: altValue,
    });
  };

  handleClose = evt => {
    this.setState({
      fullImage: undefined
    });
  };
  

  render() {
    const { searchResults } = this.state;
    const { didUserSearch } = this.state;
    const { fewResponse } = this.state;
    const { isLoading } = this.state;
    const { fullImage, imageAlt } = this.state;

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
        <ImageGallery gallery={searchResults}>
          <ImageGalleryItem
            results={searchResults}
            imageClick={this.handleImageClick}
          />
        </ImageGallery>
        <Loader isLoading={isLoading} />
        <Modal imgSrc={fullImage} altSrc={imageAlt} close={this.handleClose} />
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
