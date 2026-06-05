class SearchView {
  _parentEl = document.querySelector(".search");

  getquery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInputFields();
    return query;
  }

  _clearInputFields() {
    return (this._parentEl.querySelector(".search__field").value = "");
  }
  // addSubmitSearch(submit) {
  //   this._parentEl.addEventListener("submit", function (s) {
  //     s.preventDefault();
  //     submit();
  //   });
  // }

  addSubmitSearch(submit) {
    this._parentEl.addEventListener("submit", (s) => {
      s.preventDefault();
      submit();
    });
  }
}

export default new SearchView();
