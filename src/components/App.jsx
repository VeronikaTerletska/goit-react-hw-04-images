import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { fetchPictures } from 'FetchPictures/FetchPictures';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  // const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  const imgInfo = event => {
    setLargeImageURL(event);
  };

  const handleFormSubmit = newName => {
    if (newName === name) {
      toast.error('You enter the same word!!! Enter new one!!!', {
        theme: 'colored',
      });
    }
    setName(newName);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!name) {
      return;
    }
    setLoading(true);
    fetchPictures(name, page)
      .then(({ data }) => {
        setImages(prevImages => [...prevImages, ...data.hits]);

        setTotalImages(data.totalHits);

        if (data.totalHits === 0) {
          toast.error(`No images with name "${this.state.name}"`, {
            theme: 'colored',
          });
        }
      })
      .catch(error => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
      })
      .finally(() => setLoading(false));
  }, [name, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const togleModal = () => {
    setShowModal(showModal => !showModal);
  };

  // const { images, loading, showModal, largeImageURL, totalImages, page } =
  //   this.state;

  const restOfImages = totalImages - page * 12;
  return (
    <div
      style={{
        height: '100vh',
        // display: 'flex',
        flexDirection: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        gap: 20,
        marginTop: 80,
      }}
    >
      <Searchbar onSubmitForm={handleFormSubmit} />
      <ToastContainer autoClose={3000} />
      {images.length <= 0 && !loading && (
        <p
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101',
          }}
        >
          Enter a name picture
        </p>
      )}

      {images.length > 0 && (
        <ImageGallery
          images={images}
          showModal={togleModal}
          imgInfo={imgInfo}
        />
      )}
      {loading && <Loader loading={loading} />}

      {images.length > 0 && restOfImages > 0 && (
        <Button title="Load more" onClick={loadMoreImages} />
      )}
      {showModal && <Modal onClose={togleModal} largeImage={largeImageURL} />}

      <GlobalStyle />
    </div>
  );
}
