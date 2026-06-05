import Views from "../view/Views.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
class ResultsView extends Views {
  _parentElement = document.querySelector(".results");

  _errorMessage = "no recipe found your query please try again ariel pogi :)";
  _message = "";

  _generatesMarkUp() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }

  // _generatesMarkUp() {
  //   console.log(this._data);
  //   return this._data.map(this._generatesMarkUpPreviews).join("");
  // }

  // _generatesMarkUpPreviews(result) {
  //   const id = window.location.hash.slice(1);

  //   return `<li class="preview">
  //          <a class="preview__link ${result.id === id ? "preview__link--active" : ""}" href="#${result.id}">

  //             <figure class="preview__fig">
  //               <img src="${result.image}" alt="${result.title}" />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${result.title}</h4>
  //               <p class="preview__publisher">${result.publisher}</p>

  //             </div>
  //           </a>
  //         </li>`;
  // }
}

export default new ResultsView();
