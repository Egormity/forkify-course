import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render  the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] If false, create markkup strind insted of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {object} View object
   * @author Jonas Schmedtmann
   * @todo Test
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = this._parentElement.querySelectorAll('*');

    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];

      //--- UPDATE CHANGED TEXT ---//
      // prettier-ignore
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '')
        curEl.textContent = newEl.textContent;

      //--- UPDATE CHANGED ATTRUBUTES ---//
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  // prettier-ignore
  renderSpinner = () => {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
      </div>`
    )
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
