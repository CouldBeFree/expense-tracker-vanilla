import categories from '../styles/pages/categories.scss';
import api from './utils/axios';

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
    }

    addEventHandler() {
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
    }

    renderRow(data) {
      const newTd = () => {
        return document.createElement('td');
      }
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', data.id);
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
      console.log(editIcon);
      editButton.classList.add('common-button', 'edit');
      const editSpan = span.appendChild(editIcon);
      const removeSpan = span.appendChild(removeIcon);
      removeButton.appendChild(removeSpan);
      editButton.appendChild(editSpan);
      td.appendChild(removeButton);
      td.appendChild(editButton);
      console.log(td);
      return td;
    }

    getCategories() {
      api.get('/categories')
          .then(res => {
            // this.renderActionsBlock();
            res.forEach((category) => {
              this.renderRow(category);
            })
          })
          .catch(e => console.error(e))
    }

    init() {
      this.addEventHandler();
      this.getCategories();
    }
  }

  const handler = new CategoriesHandler();
  handler.init();
})();
