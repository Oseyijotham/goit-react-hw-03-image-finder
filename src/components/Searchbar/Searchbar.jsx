import React, { Component } from 'react';
import css from './Searchbar.module.css';


export class SearchBar extends Component{





render() {
    
    const { onCompletion } = this.props;


        return (
          <header className={css.searchBar}>
            <form className={css.form} onSubmit={onCompletion}>
              <button type="submit" className={css.button}>
                <span className={css.buttonLabel}>Search</span>
              </button>

              <input
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
        );
    }
}