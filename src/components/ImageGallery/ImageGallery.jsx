import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, showModal, imgInfo }) => {
  return (
    <GalleryList>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          webformatURL={picture.webformatURL}
          tags={picture.tags}
          largeImageURL={picture.largeImageURL}
          showModal={showModal}
          imgInfo={imgInfo}
        />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  showModal: PropTypes.func,
  imgInfo: PropTypes.func,
};
