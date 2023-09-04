import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../localstorage/local';
import spriteSvg from '../../images/icons.svg';
import { set } from 'firebase/database';
import { shopListMarkup } from './markup';
import { shopListEl, emptyBinEL } from '../refs/refs';

const BOOK_KEY = 'chosen-books';

doMarkup();

document.addEventListener('click', removeBookFromLocalStorage);

function removeBookFromLocalStorage(event) {
  const deleteBtn = event.target.closest('[data-delete]');
  if (deleteBtn) {
    const idBook = event.target.closest('.book-item').dataset.id;
    const localStorageBooks = getDataFromLocalStorage(BOOK_KEY);
    const bookToDelete = localStorageBooks.findIndex(
      book => book._id === idBook
    );
    localStorageBooks.splice(bookToDelete, 1);
    saveDataToLocalStorage(BOOK_KEY, localStorageBooks);
    shopListEl.innerHTML = shopListMarkup(localStorageBooks);
    doMarkup();
  }
}
  
function doMarkup() {
    const localStorageData = getDataFromLocalStorage(BOOK_KEY);
    if(localStorageData.length === 0) {
        emptyBinEL.classList.remove('visually-hidden');
    } else {
        emptyBinEL.classList.add('visually-hidden');
        shopListEl.insertAdjacentHTML("beforeend", shopListMarkup(localStorageData));
    }
}