import login from '../styles/pages/login.scss';
import api from './utils/axios';
import FormValidator from './utils/formValidator';
import HandleClosedRoutes from "./utils/handleClosedRoutes";

const handleClosedRoutes = new HandleClosedRoutes(window.location.pathname);

(function () {
  handleClosedRoutes.handlePublic();
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
    const wrongPswdId = 'wrong-password';
    removeNotification(wrongPswdId);
    try {
      const response = await api.post('/signin', {
        ...userData
      });
      const { token } = response;
      localStorage.setItem('expense', token);
      window.location = '/index.html';
    } catch (e) {
      console.error(e);
      const { data } = e.response;
      const errText = Object.values(data)[0];
      renderErrorNotification(errText, wrongPswdId, form);
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
    }
  });
})();
