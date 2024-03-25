import React, { Component } from 'react';


export class Button extends Component{


    render() {
        const { results } = this.props;
        const { onPress } = this.props;
        const { ifUserSearched } = this.props;
        const { iflessResponse } = this.props;
        


        return (
          <div>
            {results.length !== 0 && ifUserSearched && !iflessResponse?
                    (<button onClick={onPress}>Load More</button>)
                    :
                null
                }
          </div>
        );
    }
}