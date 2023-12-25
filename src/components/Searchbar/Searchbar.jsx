import React, { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    q: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.q);
  };

  onChange = e => {
    this.setState({
      q: e.currentTarget.value, //..
    });
  };

  render() {
    const {
      Searchbar,
      SearchForm,
      SearchFormButton,
      SearchFormButtonLabel,
      SearchFormInput,
    } = css;
    return (
      <header className={Searchbar}>
        <form className={SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={SearchFormButton}>
            <span className={SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={SearchFormInput}
            name="text"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            // value ={this.state.q}?
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

// приймає один проп onSubmit – функцію для передачі значення інпута під час сабміту форми.

// function Searchbar({ onSubmit }) {
//   return (
//     <header class="searchbar">
//       <form class="form" onSubmit={onSubmit}>
//         <button type="submit" class="button">
//           <span class="button-label">Search</span>
//         </button>

//         <input
//           class="input"
//           type="text"
//           autocomplete="off"
//           autofocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   );
// }

//onSubmit -для передачі значення інпута під час сабміту форми
