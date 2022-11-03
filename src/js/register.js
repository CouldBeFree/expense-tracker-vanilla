/* eslint-disable no-unused-vars */
import register from '../styles/pages/register.scss';
import FormValidator from './utils/formValidator';

(function () {
  const form = document.querySelector('#form');

  const formValidator = new FormValidator(form, {
    'email': {
      required: true
    },
    'password': {
      minLength: 4,
      maxLength: 15,
      required: true
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValidForm = formValidator.validate();
    if (isValidForm) {
      console.info('form valid');
    } else {
      console.info('form invalid');
    }
  });
})()
