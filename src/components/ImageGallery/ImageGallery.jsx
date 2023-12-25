import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ hits, onClick }) {
  return (
    <ul className={css.ImageGallery}>
      {hits?.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={() => onClick(id)}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}

export default ImageGallery;
