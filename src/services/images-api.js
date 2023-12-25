import axios from 'axios';

const API_KEY = '40654328-1d494b77cf448b3eaf3a4f517';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
// axios.defaults.headers.common.Authorization = API_KEY;
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (q, page) => {
  const { data } = await axios.get(`?q=${q}&page=${page}&key=${API_KEY}`);

  return data;
};

//https://pixabay.com/api/  ?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

// const params = {
//     q, пошукове слово
//     page, // = 1 default
//     key +,
//     image_type, +
//     orientation, +
//     per_page = 12 +
// }
//під час пошуку за новим ключовим словом, необхідно скидати значення page до 1.

//[{response}, ...]
// const response {
//     id,
//     webformatURL,
//     largeImageURL

// }

//axios.get('/user', {
// params: {
//   ID: 12345
// }

// const adapter = axios.create({
//   baseURL: 'https://pixabay.com/api/',
//   headers: {
//     Authorization: '1d494b77cf448b3eaf3a4f517',
//   },
// });
