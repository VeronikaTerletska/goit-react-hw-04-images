import axios from 'axios';
import PropTypes from 'prop-types';

export const fetchPictures = (name, page = 1) => {
  const apiUrl = 'https://pixabay.com/api/';
  const apiKey = '30596187-49e1a6f65199fe19d58a9462a';

  return axios.get(
    `${apiUrl}/?key=${apiKey}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
};
fetchPictures.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
