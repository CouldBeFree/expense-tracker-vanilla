class FormValidator {
  constructor(formSelector, opts) {
    this.form = formSelector;
    this.opts = opts;
  }

  get options() {
    return Object.entries(this.opts);
  }

  removeValidationMessage(node) {
    if (!node.classList.contains('is-danger')) return;
    node.classList.remove('is-danger');
    const wrapper = node.parentNode;
    const sibling = wrapper.nextElementSibling;
    sibling.remove();
  }

  renderValidationMessage(node, msg) {
    node.classList.add('is-danger');
    const wrapper = node.parentNode;
    if (wrapper.nextElementSibling) {
      return false;
    }
    const html = `<p class=\"help is-danger\">${msg}</p>`;
    wrapper.insertAdjacentHTML("afterend", html);
  }

  validateInput(selector, opts) {
    const { required, minLength, maxLength } = opts;
    let isValid = true;

    this.removeValidationMessage(selector);
    if (required && !selector.value.length) {
      this.renderValidationMessage(selector, 'This field is required');
      isValid = false;
    }

    if (minLength > selector.value.length) {
      this.renderValidationMessage(selector, `Minimal length should be ${minLength} characters`);
      isValid = false;
    }

    if (maxLength < selector.value.length) {
      this.renderValidationMessage(selector, `Maximal length should be ${maxLength} characters`);
      isValid = false;
    }

    return isValid;
  }

  validate() {
    let isValid = true;
    this.options.forEach((opt) => {
      const itemName = opt[0];
      const validationOptions = opt[1];
      const inputItem = this.form.querySelector(`[data-name=${itemName}]`);
      const isValidInput = this.validateInput(inputItem, validationOptions);
      if (!isValidInput) isValid = false;
    });
    return isValid;
  }
}

export default FormValidator;
