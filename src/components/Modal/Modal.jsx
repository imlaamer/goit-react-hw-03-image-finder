import css from './Modal.module.css';
import disableScroll from 'disable-scroll';
import React, { Component } from 'react';

class Modal extends Component {
  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.handleCloseModalImage();
    }
  };

  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.props.handleCloseModalImage();
    }
  };

  componentDidMount() {
    // document.body.style.overflow = 'hidden'; // не працює??????
    disableScroll.on();
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    // document.body.style.overflow = 'auto';
    disableScroll.off();
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { Overlay, Modal } = css;
    const { largeImageURL, tags } = this.props.modalImage;

    return (
      <div className={Overlay} onClick={this.handleOverlayClick}>
        <div className={Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
