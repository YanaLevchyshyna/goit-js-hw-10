import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const optionsNotiflix = {
  position: 'right-top',
  distance: '12px',
  borderRadius: '25px',
  timeout: 6000,
  cssAnimationStyle: 'fade',
};

const url = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_hyNbxgVUmlBkB6Z21Dsxv05CC5127mBPelEc2xtLaBIcJPMkfJWQbSH8p11VPdW4';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

const options = {
  headers: {
    api_key,
  },
};

function showLoader() {
  refs.loaderEl.style.display = 'block';
}

export function hideLoader() {
  refs.loaderEl.style.display = 'none';
}

// let storedBreeds = [];

export function fetchBreeds() {
  showLoader();
  return (
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new error(response.status);
        }
        return response.json();
      })
      .then(data => {
        const breedMarkup = data
          .map(({ id, name }) => {
            return `<option value = ${id}>${name}</option>`;
          })
          .join('');
        refs.selectEl.insertAdjacentHTML('beforeend', breedMarkup);
        new SlimSelect({
          select: '#selectElement',
        });
        // hideLoader();
      })

      //   --------------or----------
      //   for (let i = 0; i < storedBreeds.length; i += 1) {
      //     const breed = storedBreeds[i];

      //     let option = document.createElement('option');
      //     option.value = breed.id;
      //     option.innerHTML = `${breed.name}`;
      //     refs.selectEl.appendChild(option);
      //   }

      .catch(() =>
        Notiflix.Notify.failure(
          `Oops! Something went wrong! Try reloading the page!`,
          optionsNotiflix
        )
      )
  );
}

export function fetchCatByBreed(breedId) {
  showLoader();
  return fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=${options.headers.api_key}`
  )
    .then(response => {
      if (!response.ok) {
        throw new console.error(response.status);
      }
      // hideLoader();
      return response.json();
    })
    .catch(() =>
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`,
        optionsNotiflix
      )
    );
}
