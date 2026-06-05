import icons from "url:../../img/icons.svg";

export default class Views {
  _data;
  /**
   * render the received object to the DOM
   * @param {object | object[]} data the data to be rendered (recipe)
   * @param {boolean} [render = true] if false create markup string instead of rendering to the DOM
   * @returns {undefined | string} a markup is retrun if render = false
   * @this {object} View instance
   * @author ariel mendoza
   * @todo finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generatesMarkUp();

    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  update(data) {
    // if (!datas || (Array.isArray(datas) && datas.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkUp = this._generatesMarkUp();

    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newEl = Array.from(newDom.querySelectorAll("*"));
    const currentEl = Array.from(this._parentElement.querySelectorAll("*"));

    newEl.forEach((el, i) => {
      const curel = currentEl[i];
      // console.log(curel, el.isEqualNode(curel));

      // UPDATE CHANGE TEXT
      if (!el.isEqualNode(curel) && el.firstChild?.nodeValue.trim() !== "") {
        // console.log("🔥", el.firstChild.nodeValue.trim());
        curel.textContent = el.textContent;
      }

      if (!el.isEqualNode(curel)) console.log(Array.from(el.attributes));
      Array.from(el.attributes).forEach((att) =>
        curel.setAttribute(att.name, att.value),
      );
    });
  }

  // clear
  _clear() {
    this._parentElement.innerHTML = "";
  }

  // render spinner
  renderSpinner = function () {
    const markUp = `<div class="spinner">  
              <svg>
                <use href="${icons}_icon-loader"></use>
              </svg>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  };

  // rendering ERROR
  renderError(message = this._errorMessage) {
    const markUp = ` <div class="error">
        <div>
          <svg>
            <use href="${icons}_icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>;`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  // success message
  renderMessage(message = this._message) {
    const markUp = ` <div class="message">
        <div>
          <svg>
            <use href="${icons}_icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>;`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
}
