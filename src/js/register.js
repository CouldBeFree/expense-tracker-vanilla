/* eslint-disable no-unused-vars */
import register from '../styles/pages/register.scss'

(function () {
  class FormValidator {
    constructor(formSelector, opts) {
      this.form = formSelector;
      this.opts = opts;
    }

    get options() {
      return Object.entries(this.opts);
    }

    validateRequired(selector) {
      if (!selector.value.length) {
        selector.classList.add('is-danger');
        const wrapper = selector.parentNode;
        if (wrapper.nextElementSibling) {
          return false;
        }
        const html = "<p class=\"help is-danger\">This field is required</p>";
        wrapper.insertAdjacentHTML("afterend", html);
        return false;
      } else if (selector.classList.contains('is-danger')) {
        selector.classList.remove('is-danger');
        const wrapper = selector.parentNode;
        const node = wrapper.nextElementSibling;
        node.remove();
        return true;
      } else {
        return true;
      }
    }

    validateMinLength(selector, opts) {
      return true;
    }

    validateMaxLength(selector, opts) {
      return true;
    }

    validateInput(selector, opts) {
      let isValid = false;
      for (const option in opts) {
        switch(option){
          case 'required':
            isValid = this.validateRequired(selector, opts);
            break;
          case 'minLength':
            isValid = this.validateMinLength(selector, opts);
            break;
          case 'maxLength':
            isValid = this.validateMaxLength(selector, opts);
            break;
        }
      }
      return isValid;
    }

    validate() {
      let isValid = false;
      this.options.forEach((opt) => {
        const itemName = opt[0];
        const validationOptions = opt[1];
        const inputItem = this.form.querySelector(`[data-name=${itemName}]`);
        isValid = this.validateInput(inputItem, validationOptions);
      });
      return isValid;
    }
  }

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
    console.log(formValidator.validate());
  });
})()
