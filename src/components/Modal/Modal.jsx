import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

export function Modal({ onClose, largeImage }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleClickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickBackdrop}>
      <ModalWindow>
        <img src={largeImage} alt="" />
      </ModalWindow>
    </Overlay>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
