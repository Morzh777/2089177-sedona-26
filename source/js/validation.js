let MAX_SYMBOLS = 20;
let MAX_COMMENTLENGTH = 140;
const getMaxStringLength = (string, length) => string.length <= length;

let inputNameElement = document.querySelector("#login-name");
let inputSurnameElement = document.querySelector("#login-surname");
let inputPatronymicElement = document.querySelector("#login-patronymic");
let inputTelephoneElement = document.querySelectorAll("#contact-telephone");
let inputEmailElement = document.querySelectorAll("#contact-email");
let inputDescriptionElement = document.querySelector("#feedback-description");

const errorMessage = {
  COMMENT_LENGTH: `Нельзя писать больше ${MAX_SYMBOLS} символов`,
};

const onSurnameElementClick = () => {
  let inputCommentText = inputNameElement.value;
  inputNameElement.setCustomValidity("");

  if (inputCommentText.length > MAX_SYMBOLS) {
    inputNameElement.setCustomValidity(`${errorMessage.COMMENT_LENGTH}`);
  }
};
inputNameElement.addEventListener("input", onSurnameElementClick);

const onTelephoneNumberElementClick = () => {
  [].forEach.call(inputTelephoneElement, (input) => {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, (a) => {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      let reg = matrix
        .slice(0, this.value.length)
        .replace(/_+/g, (a) => {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = newValue;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
};

window.addEventListener("DOMContentLoaded", onTelephoneNumberElementClick);
