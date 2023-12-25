import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import * as ImageApi from 'services/images-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    q: '',
    page: 1,
    hits: [],
    isMorePhotos: false,
    id: 0,
    error: null,
    isEmpty: false,
    isModalOpen: false, // чи можна пропом?
  };

  componentDidMount() {
    // if (this.state.isModalOpen) {
    //   document.addEventListener('keydown', this.handleEscCloseModal);
    //   console.log('hi');
    // }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscCloseModal); //
  }

  async componentDidUpdate(_, prevState) {
    const { q, page } = this.state;

    if (prevState.q !== q || prevState.page !== page) {
      //  || prevState.id !== id ??
      try {
        const { hits, totalHits } = await ImageApi.getImages(q, page);

        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          isLoadMore: page < Math.ceil(totalHits / 12), //42 pages - 500 totalHots and 12 per_page
        }));
      } catch (error) {
        this.setState({ error: error.message });
      }
    }

    if (this.state.isModalOpen) {
      document.addEventListener('keydown', this.handleEscCloseModal);
    }
  }

  onSubmit = q => {
    if (q === this.state.q) return;
    // if (q === '')

    this.setState({
      q,
      page: 1,
      hits: [],
      isLoadMore: false,
      id: 0,
      isEmpty: false,
    });
  };
  // нове пошукове слово і все нове має бути

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleToggleModal = id => {
    this.setState({ isModalOpen: !this.state.isModalOpen, id });
    document.body.classList.toggle('no-scroll'); //?
  };

  handleEscCloseModal = e => {
    if (e.key === 'Escape') {
      this.setState({ isModalOpen: !this.state.isModalOpen });
      document.body.classList.toggle('no-scroll');
      //KeyboardEvent { key: 'a', code: 'KeyA'}
    }
  };

  render() {
    const { hits, isLoadMore, error, isEmpty, isModalOpen } = this.state;

    return (
      <div
        styles={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />

        {hits.length > 0 && (
          <ImageGallery hits={hits} onClick={this.handleToggleModal} />
        )}

        {isLoadMore && <Button onClick={this.handleLoadMore} />}

        <Loader></Loader>

        {isModalOpen && (
          <Modal
            hits={hits}
            onClick={this.handleToggleModal}
            onKeyDown={this.handleEscCloseModal}
            id={this.state.id}
          />
        )}

        {error && <p style={{ textAlign: 'center' }}>Oops. {error} </p>}

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
              There are no images.
            </p>
          </div>
          // cat whuile blach -  There are no images
        )}
      </div>
    );
  }
}

export default App;

//  TASKS:

//зробити запити окремо від АПП ?

// ітем в галерею чи норм і так ?

//для чого  рандом айді ? бо в апішкі не було ?

//зробити компоненти для error та There are no images.

// запити робота з аксіоз, передача станів - які треба оновлювати де  і як вони будуть оновлюватись , пагінація, врахування всіх умов - пустий масив , коли показувати та хоати кнопку лоуд мо..
