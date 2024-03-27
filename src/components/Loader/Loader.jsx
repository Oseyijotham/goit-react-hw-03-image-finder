import React, { Component } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

export class Loader extends Component{


    render() {
        const { isLoading } = this.props;

    
        
        return (
          <>
            {isLoading && (
              <div className={css.backDrop}>
                <ThreeCircles
                  visible={true}
                  height="80"
                  width="80"
                  color="rgb(209, 209, 209)"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass={css.loader}
                />
              </div>
            )}
          </>
        );
    }
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };