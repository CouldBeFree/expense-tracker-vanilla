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
    },
    'name': {
      minLength: 4,
      maxLength: 15,
      required: true
    }
  })

  function removeSuccessBlock() {
    const notification = document.querySelector('#notification');
    if (notification) notification.remove();
  }

  async function createUser(form, data = {}) {
    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const successBlock = document.createElement('div');
      successBlock.classList.add('notification', 'is-warning');
      successBlock.textContent = 'You successfully registered';
      successBlock.setAttribute('id', 'notification');
      form.appendChild(successBlock);
      clearForm();
      return response.json();
    } catch (e) {
      console.error(e);
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

  async function validateForExistingUser(form, email) {
    const response = await fetch('http://localhost:4000/users');
    const users = await response.json();
    const usersFromApi = users.filter(user => user.email === email);
    const userErrorNode = document.querySelector('#user-error');
    if (userErrorNode) userErrorNode.remove();
    if (usersFromApi.length) {
      const div = document.createElement('div');
      div.textContent = 'User with this email already exists';
      div.classList.add('notification', 'is-danger');
      div.setAttribute('id', 'user-error');
      form.appendChild(div);
      throw new Error('User already exists');
    }
    return true;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isValidForm = formValidator.validate();
    const emailValue = form.querySelector('[data-name="email"]').value;
    const passwordValue = form.querySelector('[data-name="password"]').value;
    const nameValue = form.querySelector('[data-name="name"]').value;
    const submitButton = form.querySelector('button');
    const id = Math.random().toString(16).slice(2);

    removeSuccessBlock();
    if (!isValidForm) return;
    submitButton.setAttribute('disabled', '');
    try {
      await validateForExistingUser(form, emailValue);
      await createUser(form, {
        email: emailValue,
        password: passwordValue,
        name: nameValue,
        id
      });
    } catch (e) {
      console.error(e);
    }
    submitButton.removeAttribute('disabled');
  });
})()
