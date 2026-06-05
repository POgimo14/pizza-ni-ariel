import Views from "../view/Views.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
class BookMarkView extends Views {
  _parentElement = document.querySelector(".bookmarks__list");

  _errorMessage = "no bookmarks ariel pogi :)";
  _message = "";

  addhandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generatesMarkUp() {
    console.log(this._data);
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookMarkView();
