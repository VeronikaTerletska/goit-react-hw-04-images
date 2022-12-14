import React, { Component } from 'react';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  Form,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    name: '',
    pictures: [],
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.name.trim() === '') {
      toast.error('Please, enter the word');
      return;
    }
    this.props.onSubmitForm(this.state.name);
    this.setState({ name: '' });
  };

  handleInputChange = evt => {
    const { value } = evt.currentTarget;
    this.setState({ name: value.toLowerCase() });
  };

  render() {
    return (
      <SearchbarHeader>
        <Form onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>
              <BiSearch style={{ width: 30, height: 30 }} />
            </SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleInputChange}
            className="input"
            type="text"
            name="name"
            value={this.state.name}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarHeader>
    );
  }
}
