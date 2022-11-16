import categories from '../styles/pages/categories.scss';

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

    init() {
      this.addEventHandler();
    }
  }

  const handler = new CategoriesHandler();
  handler.init();
})();
