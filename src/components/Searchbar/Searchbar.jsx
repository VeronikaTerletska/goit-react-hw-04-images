import React, { useState } from 'react';
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

export function Searchbar({ onSubmitForm }) {
  const [name, setName] = useState('');
  // state = {
  //   name: '',
  //   pictures: [],
  // };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (name.trim() === '') {
      toast.error('Please, enter the word');
      return;
    }
    onSubmitForm(name);
    setName('');
  };

  const handleInputChange = evt => {
    const { value } = evt.currentTarget;
    setName(value.toLowerCase());
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>
            <BiSearch style={{ width: 30, height: 30 }} />
          </SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInputChange}
          className="input"
          type="text"
          name="name"
          value={name}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarHeader>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
