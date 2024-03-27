import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';


export class ImageGalleryItem extends Component{


  render() {

    const { results } = this.props;
    const { imageClick } = this.props;
    

      if (!results || results.length === 0) {
        return null; 
      }
     
     //console.log(results);
      
      return results.map(result => (
        <li key={result.id} className={css.item}>
          <img
            className={css.image}
            src={result.webformatURL}
            alt={result.tags}
            name={result.largeImageURL}
            onClick={imageClick}
          />
        </li>
      ));
      
    
    
    }
}

ImageGalleryItem.propTypes = {
  results: PropTypes.array.isRequired,
  imageClick: PropTypes.func.isRequired,
};
