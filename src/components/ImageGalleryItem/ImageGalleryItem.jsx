import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';



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


/*export const ImageGalleryItem = ({ results }) => (
  <ul>
    {results.length !== 0 ? (
      results.map(({ id, webformatURL, tags }) => (
      <li key={id}>
        <img className={css.avatar} src={webformatURL} alt={tags} />
      </li>
      ))
    )
      :
      <p>Empty Array</p>
  }
  </ul>
);*/