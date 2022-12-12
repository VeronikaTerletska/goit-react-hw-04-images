import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  showModal,
  imgInfo,
}) => (
  <GalleryItem key={id} onClick={showModal}>
    <GalleryItemImg
      src={webformatURL}
      alt={tags}
      dataLargeimageurl={largeImageURL}
      onClick={() => {
        imgInfo(largeImageURL);
      }}
    />
  </GalleryItem>
);
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  showModal: PropTypes.func,
};
