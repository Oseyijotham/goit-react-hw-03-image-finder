import React, { Component } from 'react';
import css from './ImageGallery.module.css';


export class ImageGallery extends Component{




  render() {
   
    const { children } = this.props;
    const { gallery } = this.props;
    
        

    return (
      <>
        {gallery.length !== 0 ? (
          <ul className={css.gallery}>{children}</ul>
        ) : (
          <p>No Pictures</p>
        )}
      </>
    );
    }



}