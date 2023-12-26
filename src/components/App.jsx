import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { STATUSES } from 'utils/constants';
import * as ImageApi from 'services/images-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import ErrorMessage from './ErrorMessage/ErrorMessage';

class App extends Component {
  state = {
    status: STATUSES.idle,
    q: '',
    page: 1,
    hits: null,
    modalImage: null,
    isModalOpen: false,
    isLoadMore: false,
    isEmpty: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { q, page } = this.state;

    if (prevState.q !== q || prevState.page !== page) {
      try {
        this.setState({ status: STATUSES.pending });
        const { hits, totalHits } = await ImageApi.getImages(q, page);
        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          hits: this.state.hits ? [...prevState.hits, ...hits] : [...hits],
          isLoadMore: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message, status: STATUSES.error });
      } finally {
        this.setState({ status: STATUSES.success });
      }
    }
  }

  onSubmit = q => {
    if (q.trim() === '') return alert('Please enter your search term');
    if (q === this.state.q) return;

    this.setState({
      q,
      page: 1,
      hits: null,
      isLoadMore: false,
      isEmpty: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleShowModalImage = imageId => {
    const selectedImage = this.state.hits.find(image => image.id === imageId);
    this.setState({
      isModalOpen: true,
      modalImage: selectedImage,
      status: STATUSES.pending,
    });
  };

  handleCloseModalImage = () => {
    this.setState({ isModalOpen: false, status: STATUSES.idle });
  };

  render() {
    const { hits, isLoadMore, error, isEmpty, isModalOpen } = this.state;
    const showImages = STATUSES.success && Array.isArray(this.state.hits);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />

        {showImages && (
          <ImageGallery
            hits={hits}
            handleShowModalImage={this.handleShowModalImage}
          />
        )}

        {isLoadMore && <Button onClick={this.handleLoadMore} />}

        {isModalOpen && (
          <Modal
            hits={hits}
            handleCloseModalImage={this.handleCloseModalImage}
            modalImage={this.state.modalImage}
          />
        )}

        {this.state.status === STATUSES.pending && (
          <div
            className="loadingBox"
            style={{
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isModalOpen ? 'none' : 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <ThreeDots
              visible={true}
              height="100"
              width="100"
              color="#3F51B5"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}

        {this.state.status === STATUSES.error && (
          <ErrorMessage error={this.state.error} />
        )}

        {isEmpty && (
          <div
            style={{
              width: '100vw',
              height: 'calc(100vh - 70px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ textAlign: 'center', fontSize: 50, margin: 0 }}>
              Sorry! <br />
              There are no images
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
