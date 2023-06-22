import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed, hideLoader } from './cat-api.js';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
};

fetchBreeds();

refs.selectEl.addEventListener('change', onSelect);

function onSelect(e) {
  let breedId = e.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const catInfoMarkup = data[0].breeds
        .map(({ name, description, temperament }) => {
          return `<h1>${name}</h1><p>${description}</p><p>${temperament}</p>`;
        })
        .join('');

      const catImgMarkup = data
        .map(({ url }) => {
          return `<img src="${url}" alt="cat" width=500/>`;
        })
        .join('');

      refs.catInfoEl.insertAdjacentHTML('afterbegin', catImgMarkup);
      refs.catInfoEl.insertAdjacentHTML('beforeend', catInfoMarkup);
    })
    .catch(() =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
    )
    .finally(() => {
      hideLoader();
    });
  refs.catInfoEl.innerHTML = '';
}
