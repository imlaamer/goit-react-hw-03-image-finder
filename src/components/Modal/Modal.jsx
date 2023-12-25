import css from './Modal.module.css';

function Modal({ hits, onClick, onKeyDown, id }) {
  const { Overlay, Modal } = css;

  const imageById = hits?.find(image => image.id === id);

  return (
    <div
      className={Overlay}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex="0"
    >
      <div className={Modal}>
        <img
          src={imageById.largeImageURL}
          alt={imageById.tags}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default Modal;

// Під час кліку на елемент галереї повинно відкриватися модальне вікно з темним оверлеєм і відображатися велика версія зображення.
//Модальне вікно повинно закриватися по натисканню клавіші ESC або по кліку на оверлеї.

// Зовнішній вигляд схожий на функціонал цього VanillaJS-плагіна, тільки замість білого модального вікна рендериться зображення (у прикладі натисніть Run). Анімацію робити не потрібно!

// const [{ largeImageURL, tags }] = hits; //12
