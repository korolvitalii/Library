import onChange from 'on-change';
import { getLocalStorageData, setLocalStorageData } from './utils';
import { renderItems } from './view';

const app = async () => {
  const state = {
    form: {},
    books: [],
    errors: [],
  };
  if (!state.books === null) {
    setLocalStorageData([]);
  }

  const tableHead = `
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">Tytuł książki</div>
      <div class="col col-2">Autor książki</div>
      <div class="col col-3">Priorytet </div>
      <div class="col col-4">Kategoria</div>
    </li> 
  </ul>`;

  const domElements = {
    form: document.querySelector('.form'),
    booksList: document.querySelector('.table-head-wrapper'),
    books: document.querySelector('.table-body-wrapper'),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (var [key, value] of formData.entries()) {
      state.form = { ...state.form, [key]: value };
    }
    watchedState.books = [state.form, ...state.books];
    domElements.form.reset();
  };

  domElements.form.addEventListener('submit', onSubmit);

  const watchedState = onChange(state, async (path, value) => {
    if (path === 'books') {
      renderItems(state.books, domElements.books);
      renderItems(tableHead, domElements.booksList);
      setLocalStorageData('books', state.books);
    }
  });
  watchedState.books = await getLocalStorageData('books');
};

export default app;
