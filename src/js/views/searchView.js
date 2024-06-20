class SearchView {
  _parentEl = document.querySelector('.search');
  _searchEl = this._parentEl.querySelector('.search__field');

  clearInput = () => (this._searchEl.value = '');

  getQuery = () => {
    const query = this._searchEl.value;
    this.clearInput();
    return query;
  };

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
