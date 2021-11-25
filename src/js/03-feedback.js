var throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);

form.addEventListener('input', throttle(onFormInput, 500));

pushToTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log({
    email: form.email.value,
    message: form.message.value,
  });
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function pushToTextarea() {
  const savedMassage = localStorage.getItem(STORAGE_KEY);
  const parsedStorage = JSON.parse(savedMassage);
  if (savedMassage) {
    form.email.value = parsedStorage.email;
    form.message.value = parsedStorage.message;
  }
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
