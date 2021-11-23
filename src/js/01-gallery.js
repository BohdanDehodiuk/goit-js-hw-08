// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const galleryConteiner = document.querySelector('.gallery');

const galleryMarkup = createImagesGalleryMarkup(galleryItems);

galleryConteiner.addEventListener('click', makeClickImageGallery);

galleryConteiner.insertAdjacentHTML('beforeend', galleryMarkup);

function createImagesGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                />
            </a>`;
    })
    .join('');
}

var lightbox = new SimpleLightbox('.gallery a', {
  overlay: true,
  captionType: 'attr',
  captionDelay: 250,
  captionsData: 'alt',
});

function makeClickImageGallery(e) {
  e.preventDefault();
}
