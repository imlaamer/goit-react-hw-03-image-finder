import css from './Button.module.css';

function Button({ onClick }) {
  return (
    <div className={css.buttonBox}>
      <button type="button" className={css.Button} onClick={onClick}>
        Load More
      </button>
    </div>
  );
}

export default Button;

// onClick ->
// довантажуватись наступна порція зображень і рендеритися разом із попередніми.
//Кнопка повинна рендеритися лише тоді, коли є якісь завантажені зображення.Якщо масив зображень порожній, кнопка не рендериться.
