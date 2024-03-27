import React, { Component } from 'react';
import css from './Modal.module.css';
import svg from "./icons.svg";
import PropTypes from 'prop-types';

export class Modal extends Component{


  render() {
    const { imgSrc } = this.props;
    const { altSrc } = this.props;
    const { close } = this.props;
    return (
      <>
        {imgSrc !== undefined && (
          <div className={css.overlay}>
            <button className={css.closeModal} onClick={close}>
              <svg width="20px" height="20px" className={css.modalIcon}>
                  <use href={`${svg}#icon-close`}></use>
              </svg>
            </button>
            <div className={css.modal}>
              <img className={css.modalImage} src={imgSrc} alt={altSrc} />
            </div>
          </div>
        )}
      </>
    );
    }
}

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altSrc: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};