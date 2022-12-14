import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    name: '',
    loading: false,
    page: 1,
    // perPage: 12,
    images: [],
    error: null,
    showModal: false,
    // largeImageURL: '',
    // alt: '',
    totalImages: 0,
  };

  imgInfo = event => {
    this.setState({
      largeImageURL: event,
    });
  };

  handleFormSubmit = name => {
    if (this.state.name === name) {
      toast.error('You enter the same word!!! Enter new one!!!', {
        theme: 'colored',
      });
    }
    this.setState({
      name,
      page: 1,
      images: [],
    });
  };

  async searchArticles() {
    const { name, page } = this.state;
    this.setState({ loading: true });

    try {
      const { data } = await fetchPictures(name, page);
      this.setState({
        images: [...this.state.images, ...data.hits],
        totalImages: data.totalHits,
      });

      if (data.totalHits === 0) {
        toast.error(`No images with name "${this.state.name}"`, {
          theme: 'colored',
        });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;

    if (prevState.name === name && prevState.page === page) {
      return;
    }
    this.searchArticles();
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, loading, showModal, largeImageURL, totalImages, page } =
      this.state;

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
        <Searchbar onSubmitForm={this.handleFormSubmit} />
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
            showModal={this.togleModal}
            imgInfo={this.imgInfo}
          />
        )}
        {loading && <Loader loading={loading} />}

        {images.length > 0 && restOfImages > 0 && (
          <Button title="Load more" onClick={this.loadMoreImages} />
        )}
        {showModal && (
          <Modal onClose={this.togleModal} largeImage={largeImageURL} />
        )}

        <GlobalStyle />
      </div>
    );
  }
}
