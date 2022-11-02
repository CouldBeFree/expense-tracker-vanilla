/* eslint-disable no-unused-vars */
import register from '../styles/pages/register.scss'

(function () {
  class FormValidator {
    constructor(formSelector, opts) {
      this.form = formSelector;
      this.opts = opts;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
      });
    }

    get options() {
      return Object.entries(this.opts);
    }

    validateInput(selector, opts) {
      console.log('selector', selector);
      console.log('opts', opts);
    }

    validate() {
      this.options.forEach((opt) => {
        const itemName = opt[0];
        const validationOptions = opt[1];
        const inputItem = this.form.querySelector(`[data-name=${itemName}]`);
        this.validateInput(inputItem, validationOptions);
      });
      return true;
    }
  }

  const form = document.querySelector('#form');
  const email = form.querySelector('[data-name="email"]');
  const password = form.querySelector('[data-name="password"]');
  console.log('email', email);
  console.log('password', password);
  console.log(form);

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
})()
