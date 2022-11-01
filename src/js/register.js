import register from '../styles/pages/register.scss'

(function () {
  class FormValidator {
    constructor(formSelector, opts) {
      this.form = formSelector;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
      });
    }
  }

  const form = document.querySelector('#form');
  console.log(form);

  const formValidator = new FormValidator('', {
    'email': {},
    'password': {
      minLength: 4,
      maxLength: 15
    }
  })
})()
