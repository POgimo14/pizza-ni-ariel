import Views from "../view/Views.js";
import icons from "url:../../img/icons.svg";
class PaginationView extends Views {
  _parentElement = document.querySelector(".pagination");

  // pagination pages button
  addhandlerClick(handler) {
    this._parentElement.addEventListener("click", function (clickPages) {
      const btnPages = clickPages.target.closest(".btn--inline");
      if (!btnPages) return;
      const gotoBtnPage = +btnPages.dataset.goto;
      // console.log(gotoBtnPage);
      handler(gotoBtnPage);
    });
  }

  _generatesMarkUp() {
    // page 1

    const currentpages = this._data.page;
    const numberPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );
    // console.log(numberPages);
    if (currentpages === 1 && numberPages > 1) {
      return `<button data-goto="${currentpages + 1}" class="btn--inline pagination__btn--next">
            <span>Pages ${currentpages + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }

    if (currentpages === numberPages && numberPages > 1) {
      return `<button data-goto="${currentpages - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use + href="${icons}#icon-arrow-left"></use>
            </svg>
            <>pages ${currentpages - 1}</ span>
          </button>`;
    }

    // other pages

    if (currentpages < numberPages) {
      return `<button data-goto="${currentpages - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>pages ${currentpages - 1}</span>
          </button>
          
          <button data-goto="${currentpages + 1}" class="btn--inline pagination__btn--next">
            <span>Pages ${currentpages + 1}</span>
            <svg class="search__icon">
              <use href=" ${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    return ``;
  }
}

export default new PaginationView();
