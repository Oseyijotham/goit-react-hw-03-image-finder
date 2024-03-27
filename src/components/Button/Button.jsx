import React, { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component{


    render() {
        const { results } = this.props;
        const { onPress } = this.props;
        const { ifUserSearched } = this.props;
        const { iflessResponse } = this.props;
        


        return (
          <div>
            {results.length !== 0 && ifUserSearched && !iflessResponse?
                    (<button onClick={onPress} className={css.loadBtn}>Load More</button>)
                    :
                null
                }
          </div>
        );
    }
}

Button.propTypes = {
  results: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  ifUserSearched: PropTypes.bool.isRequired,
  iflessResponse: PropTypes.bool.isRequired,
};