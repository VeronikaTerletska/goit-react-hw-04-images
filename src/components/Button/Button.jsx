import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreBtn, Container } from './Button.styled';

export const Button = ({ title, onClick }) => (
  <Container>
    <LoadMoreBtn type="button" onClick={onClick}>
      {title}
    </LoadMoreBtn>
  </Container>
);

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};
