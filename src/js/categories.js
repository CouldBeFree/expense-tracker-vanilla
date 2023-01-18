import categories from '../styles/pages/categories.scss';
import api from './utils/axios';
import { categoryCRUDTypes } from './types';

(function () {
  class CategoriesHandler {
    constructor() {
      this.removeButtons = document.querySelectorAll('.remove');
      this.editButtons = document.querySelectorAll('.edit');
      this.removePopup = document.querySelector('#remove-modal');
      this.closeRemoveModal = document.querySelectorAll('.delete');
      this.modalBackground = document.querySelectorAll('.modal-background');
      this.editModal = document.querySelector('#edit-modal');
      this.addNewCategory = document.querySelector('#add-category');
      this.categoryTarget = document.querySelector('#category-target');
      this.categoryForm = document.querySelector('#category-form');
      // TODO clear remove id when close the modal
      this.editOrRemoveId = null;
      this.currentCRUDType = categoryCRUDTypes['remove'];
      this.types = categoryCRUDTypes;
    }

    clearCategoriesInUI() {
      while (this.categoryTarget.firstChild) {
        this.categoryTarget.removeChild(this.categoryTarget.lastChild);
      }
    }

    removeCategory(btn) {
      btn.setAttribute('disabled', true);
      api.delete(`/category/${this.editOrRemoveId}`)
          .then(() => {
            btn.removeAttribute('disabled');
            this.removePopup.classList.remove('is-active');
            this.getCategories();
          })
          .catch(e => {
            btn.removeAttribute('disabled');
            console.error(e);
          })
    }

    addEventHandler() {
      this.removePopup.addEventListener('click', (e) => {
        if (e.target.dataset.action) {
          switch(e.target.dataset.action) {
            case 'remove':
              this.removeCategory(e.target);
              this.removeCategory();
              break;
            case 'cancel':
              console.log('cancel');
              break;
            default:
              return false;
          }
        }
      });
      this.removeButtons.forEach(el => {
        el.addEventListener('click', () => {
          this.removePopup.classList.add('is-active');
        })
      });
      this.editButtons.forEach(el => {
        el.addEventListener('click', () => {
          this.editModal.classList.add('is-active');
        })
      });
      this.closeRemoveModal.forEach(el => {
        el.addEventListener('click', () => {
          this.removePopup.classList.remove('is-active');
          this.editModal.classList.remove('is-active');
        });
      });
      this.modalBackground.forEach(el => {
        el.addEventListener('click', () => {
          this.removePopup.classList.remove('is-active');
          this.editModal.classList.remove('is-active');
        });
      });
      this.addNewCategory.addEventListener('click', () => {
        this.editModal.classList.add('is-active');
      });
      this.categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveCategory();
      });
    }

    renderRow(data) {
      const newTd = () => {
        return document.createElement('td');
      }
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', data.id);
      tr.addEventListener('click', (e) => {
        if (e.target.dataset.action) {
          this.editOrRemoveId = e.target.parentNode.parentNode.dataset.id
          this.currentCRUDType = this.types[e.target.dataset.action];
          switch(e.target.dataset.action) {
            case 'remove':
              this.removePopup.classList.add('is-active');
              return;
            case 'edit':
              this.editModal.classList.add('is-active');
              return;
            default:
              return false;
          }
        }
      })
      const categoryHolder = newTd();
      const typeHolder = newTd();
      categoryHolder.textContent = data.name;
      typeHolder.textContent = data.type;
      tr.appendChild(categoryHolder);
      tr.appendChild(typeHolder);
      tr.appendChild(this.renderActionsBlock());
      this.categoryTarget.appendChild(tr);
    }

    renderActionsBlock() {
      const td = document.createElement('td');
      const span = document.createElement('span');
      span.classList.add('icon', 'is-small');
      const removeIcon = document.createElement('i');
      removeIcon.classList.add('fa-solid', 'fa-trash');
      const editIcon = document.createElement('i');
      editIcon.classList.add('fa-solid', 'fa-pen');
      const removeButton = document.createElement('button');
      removeButton.classList.add('common-button', 'remove');
      const editButton = document.createElement('button');
      span.appendChild(editIcon);
      // console.log(editIcon);
      editButton.classList.add('common-button', 'edit');
      const editSpan = span.appendChild(editIcon);
      const removeSpan = span.appendChild(removeIcon);
      removeButton.appendChild(removeSpan);
      editButton.appendChild(editSpan);
      editButton.textContent = 'Edit';
      removeButton.textContent = 'Remove';
      editButton.setAttribute('data-action', 'edit');
      removeButton.setAttribute('data-action', 'remove');
      td.appendChild(removeButton);
      td.appendChild(editButton);
      // console.log(td);
      return td;
    }

    saveCategory() {
      const input = document.querySelector('#category-name');
      let inputVal = input.value;
      let type = null;
      if (input.classList.contains('error')) input.classList.remove('error');
      if (!inputVal) {
        input.classList.add('error');
      }
      const radio = document.querySelectorAll('#category-form [type="radio"]');
      if (radio) {
        const arType = Array.from(radio);
        const checkedRadioBtn = arType.find(el => el.checked === true);
        if (checkedRadioBtn) {
          const { value } = checkedRadioBtn;
          type = value;
        }
      }
      api.post('/create-category', {
        name: inputVal,
        type: type
      })
          .then((res) => {
            input.value = '';
            this.editModal.classList.remove('is-active');
            this.renderRow(res);
          })
    }

    getCategories(initial = false) {
      api.get('/categories')
          .then(res => {
            // this.renderActionsBlock();
            if (!initial) this.clearCategoriesInUI();
            res.forEach((category) => {
              this.renderRow(category);
            })
          })
          .catch(e => console.error(e))
    }

    init() {
      this.addEventHandler();
      this.getCategories(true);
    }
  }

  const handler = new CategoriesHandler();
  handler.init();
})();
