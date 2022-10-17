// Form Elements to be checked and operated
const form = document.querySelector(".card-input form");
const holderNameEl = document.getElementById("name");
const cardNumberEl = document.getElementById("number");
const monthDateEl = document.getElementById("date");
const yearDateEl = document.getElementById("year");
const cvcEl = document.getElementById("cvc");
const submitBtn = document.getElementById("confirm-btn");
const errorMessages = document.querySelectorAll("form p");
const complete = document.querySelector(".complete-state");

// Card elements to be changed
const holderName = document.querySelector(".name-date .name");
const cardNumber = document.querySelector(".card-info h2");
const monthDate = document.querySelector(".name-date .date .month");
const yearDate = document.querySelector(".name-date .date .year");
const cvc = document.querySelector(".back-card p");

// Real-time tracking to change card content
holderNameEl.addEventListener("keyup", () => {
  holderName.textContent = holderNameEl.value;
});
cardNumberEl.addEventListener("keyup", () => {
  cardNumber.textContent = cardNumberEl.value;
});
monthDateEl.addEventListener("keyup", () => {
  monthDate.textContent = monthDateEl.value;
});
yearDateEl.addEventListener("keyup", () => {
  yearDate.textContent = yearDateEl.value;
});
cvcEl.addEventListener("keyup", () => {
  cvc.textContent = cvcEl.value;
});
// Submit event
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (validateForm()) {
    displayResults();
    form.style.display = "none";
    complete.style.display = "block";
  }
});

function validateForm() {
  // Holder name Validation
  let isNameValid = holderNameValidation();
  // Card number validation
  let isCardValid = cardNumberValidation();
  // Date validation
  let isMonthValid = monthValidation();
  let isYearValid = yearValidation();
  // CVC validation
  let isCVCValid = cvcValidation();

  if (
    isCVCValid === true &&
    isCardValid === true &&
    isNameValid === true &&
    isMonthValid === true &&
    isYearValid === true
  ) {
    return true;
  } else {
    return false;
  }
}

// Holder name Validation
function holderNameValidation() {
  if (holderNameEl.value === "") {
    errorMessages[0].textContent = "Cant be blank";
    holderNameEl.classList.add("error");
    return false;
  } else if (holderNameEl.value.length < 6) {
    errorMessages[0].textContent = "Must be 6 character or more";
    holderNameEl.classList.add("error");
    return false;
  } else {
    for (let i = 0; i < holderNameEl.value.length; i++) {
      parseInt(holderNameEl.value[i]);
      if (!isNaN(holderNameEl.value[i]) && !holderNameEl.value[i] === " ") {
        errorMessages[0].textContent = "Wrong format, characters only";
        holderNameEl.classList.add("error");
        return false;
      }
    }
  }
  errorMessages[0].textContent = "";
  holderNameEl.classList.remove("error");
  return true;
}

// Card number Validation
function cardNumberValidation() {
  if (cardNumberEl.value === "") {
    errorMessages[1].textContent = "Cant be blank";
    cardNumberEl.classList.add("error");
    return false;
  } else if (cardNumberEl.value.length !== 16) {
    errorMessages[1].textContent = "Must be 16 number";
    cardNumberEl.classList.add("error");
    return false;
  } else {
    for (let i = 0; i < cardNumberEl.value.length; i++) {
      parseInt(cardNumberEl.value[i]);
      if (isNaN(cardNumberEl.value[i])) {
        errorMessages[1].textContent = "Wrong format, numbers only";
        cardNumberEl.classList.add("error");
        return false;
      }
    }
  }
  errorMessages[1].textContent = "";
  cardNumberEl.classList.remove("error");
  return true;
}

// Month Validation
function monthValidation() {
  if (monthDateEl.value === "") {
    errorMessages[2].textContent = "Can't be blank";
    monthDateEl.classList.add("error");
    return false;
  } else if (monthDateEl.value > 12 || monthDateEl.value < 1) {
    errorMessages[2].textContent = "Wrong range must be 1 to 12";
    monthDateEl.classList.add("error");
    return false;
  } else {
    errorMessages[2].textContent = "";
    monthDateEl.classList.remove("error");
    return true;
  }
}

// Year Validation
function yearValidation() {
  if (yearDateEl.value === "") {
    errorMessages[2].textContent = "Can't be blank";
    yearDateEl.classList.add("error");
    return false;
  } else if (yearDateEl.value < 23) {
    errorMessages[2].textContent = "Wrong range must be greater than 22";
    yearDateEl.classList.add("error");
    return false;
  } else {
    yearDateEl.classList.remove("error");
    return true;
  }
}

// CVC Validation
function cvcValidation() {
  if (cvcEl.value === "") {
    errorMessages[3].textContent = "Can't be blank";
    cvcEl.classList.add("error");
    return false;
  } else if (cvcEl.value.length < 3) {
    errorMessages[3].textContent = "Must be 3 numbers";
    cvcEl.classList.add("error");
    return false;
  } else {
    errorMessages[3].textContent = "";
    cvcEl.classList.remove("error");
    return true;
  }
}

// Displaying card in suitable looking
function displayResults() {
  let index = 0;
  cardNumber.textContent = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      cardNumber.textContent += cardNumberEl.value[index];
      index++;
    }
    cardNumber.textContent += " ";
  }
  let month = parseInt(monthDateEl.value);
  if (month >= 1 && month <= 9) {
    monthDate.textContent = `0${month}`;
  }
}
