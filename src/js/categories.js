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
    }

    addHandlerForRemove() {
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
    }

    init() {
      this.addHandlerForRemove();
    }
  }

  const handler = new CategoriesHandler();
  handler.init();
})();
