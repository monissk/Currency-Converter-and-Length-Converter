// Date
const dates = document.querySelectorAll(".date");
const today = new Date();
const options = { year: "numeric", month: "short", day: "numeric" };
for (let date of dates) {
  date.textContent = today.toLocaleDateString("en-US", options);
}

// Curryncy Converter
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const currSelects = document.querySelectorAll(".currContainer select");
const currBtn = document.querySelector(".CurrConverterLogo");
const fromCurr = document.querySelector("#currSelectFrom");
const toCurr = document.querySelector("#currSelectTo");
const currAmount = document.querySelector("#currInputFrom");
const currOutput = document.querySelector("#currInputTo");

for (let currSelect of currSelects) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (currSelect.id == "currSelectFrom" && currCode == "USD") {
      newOption.selected = "selected";
    } else if (currSelect.id == "currSelectTo" && currCode == "INR") {
      newOption.selected = "selected";
    }
    currSelect.append(newOption);
  }
}

let convert = async () => {
  let currAmtVal = currAmount.value;
  if (currAmtVal == "" && currAmtVal < 1) {
    currAmount = 1;
    currAmtVal = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(rate);
  let currFinalAmt = currAmtVal * rate;
  console.log(currFinalAmt);
  currOutput.value = currFinalAmt.toFixed(5);
  console.log(currOutput);
};

currBtn.addEventListener("click", convert);
currAmount.addEventListener("input", convert);
fromCurr.addEventListener("change", convert);
toCurr.addEventListener("change", convert);

// Length Converter
const lenSelects = document.querySelectorAll(".lengthContainer select");
const lenBtn = document.querySelector(".lengthConverterLogo");
const lenFrom = document.querySelector("#lenSelectFrom");
const lenTo = document.querySelector("#lenSelectTo");
const lenInput = document.querySelector("#lenInputFrom");
const lenOutput = document.querySelector("#lenInputTo");

const lengthUnits = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.34,
  nautical_mile: 1852,
};

for (let lenSelect of lenSelects) {
  for (let lenCode in lengthUnits) {
    let newOption1 = document.createElement("option");
    newOption1.innerText = lenCode.replace("_", " ").toUpperCase(); // Optional beautify
    newOption1.value = lenCode;
    if (lenSelect.id === "lenSelectFrom" && lenCode === "meter") {
      newOption1.selected = "selected";
    } else if (lenSelect.id === "lenSelectTo" && lenCode === "inch") {
      newOption1.selected = "selected";
    }
    lenSelect.append(newOption1);
  }
}

let convertLen = () => {
  const fromUnit = lenFrom.value;
  const toUnit = lenTo.value;
  const value1 = parseFloat(lenInput.value);
  if (isNaN(value1)) {
    lenOutput.value = "0";
    return;
  }
  const result1 = value1 * (lengthUnits[fromUnit] / lengthUnits[toUnit]);
  lenOutput.value = result1.toFixed(5);
};

lenBtn.addEventListener("click", convertLen);
lenInput.addEventListener("input", convertLen);
lenFrom.addEventListener("change", convertLen);
lenTo.addEventListener("change", convertLen);
