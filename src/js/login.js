import login from '../styles/pages/login.scss';
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
  });

  function renderErrorNotification(msg, identificator, target) {
    const div = document.createElement('div');
    div.textContent = msg;
    div.classList.add('notification', 'is-danger');
    div.setAttribute('id', identificator);
    target.appendChild(div);
  }

  function removeNotification(identificator) {
    const node = document.querySelector(`#${identificator}`);
    if (node) node.remove();
  }

  async function loginUser(form, userData) {
    const { email, password } = userData;
    const userExistsId = 'exists';
    const wrongPswdId = 'wrong-password';
    removeNotification(userExistsId);
    removeNotification(wrongPswdId);
    const response = await fetch('http://localhost:4000/users');
    const users = await response.json();
    const userFromDb = users.find(el => el.email === email);
    if (!userFromDb) {
      renderErrorNotification('User not found', userExistsId, form);
    } else if (userFromDb.password !== password) {
      renderErrorNotification('Email or password incorrect', wrongPswdId, form);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (formValidator.validate()) {
      const emailValue = form.querySelector('[data-name="email"]').value;
      const passwordValue = form.querySelector('[data-name="password"]').value;
      await loginUser(form, {
        email: emailValue,
        password: passwordValue
      });
      console.info('form valid');
    } else {
      console.info('form not valid');
    }
  });
})();
