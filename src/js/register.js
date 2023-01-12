/* eslint-disable no-unused-vars */
import register from '../styles/pages/register.scss';
import FormValidator from './utils/formValidator';
import axios from 'axios';

(function () {
  const form = document.querySelector('#form');
  const register = document.querySelector('#register');

  class HandleNotifications {
    constructor(form) {
      this.form = form;
    }

    clearNotifications() {
      const notification = document.querySelector('#notification');
      if (notification) notification.remove();

      const userErrorNode = document.querySelector('#user-error');
      if (userErrorNode) userErrorNode.remove();
    }

    renderSuccess() {
      const successBlock = document.createElement('div');
      successBlock.classList.add('notification', 'is-warning');
      successBlock.textContent = 'You successfully registered';
      successBlock.setAttribute('id', 'notification');
      this.form.appendChild(successBlock);
    }

    renderError(err) {
      const div = document.createElement('div');
      div.textContent = err;
      div.classList.add('notification', 'is-danger');
      div.setAttribute('id', 'user-error');
      this.form.appendChild(div);
    }
  }

  const handleNotifications = new HandleNotifications(form);

  const formValidator = new FormValidator(form, {
    'email': {
      required: true
    },
    'password': {
      minLength: 4,
      maxLength: 15,
      required: true
    },
    'name': {
      minLength: 4,
      maxLength: 15,
      required: true
    }
  })

  async function createUser(form, data = {}) {
    handleNotifications.clearNotifications();
    try {
      await axios.post('http://localhost:5050/register', {
        ...data
      });
      clearForm();
      handleNotifications.renderSuccess();
    } catch (e) {
      const { data } = e.response;
      const errText = Object.values(data)[0];
      handleNotifications.renderError(errText);
    }
  }

  function clearForm() {
    let emailValue = form.querySelector('[data-name="email"]');
    let passwordValue = form.querySelector('[data-name="password"]');
    let nameValue = form.querySelector('[data-name="name"]');
    emailValue.value = '';
    passwordValue.value = '';
    nameValue.value = '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isValidForm = formValidator.validate();
    const emailValue = form.querySelector('[data-name="email"]').value;
    const passwordValue = form.querySelector('[data-name="password"]').value;
    const nameValue = form.querySelector('[data-name="name"]').value;
    const submitButton = form.querySelector('button');

    if (!isValidForm) return;
    submitButton.setAttribute('disabled', '');
    await createUser(form, {
      email: emailValue,
      password: passwordValue,
      username: nameValue,
    });
    submitButton.removeAttribute('disabled');
  });
})()
