const unitInfo = {
  "Celsius": {
    description: "Celsius is a metric unit of temperature where 0 is the freezing point of water.",
    history: "Named after Anders Celsius, it is widely used worldwide except in the U.S."
  },
  "Fahrenheit": {
    description: "Fahrenheit is a temperature scale used primarily in the U.S.",
    history: "Developed by Daniel Gabriel Fahrenheit in 1724."
  },
  "Kelvin": {
    description: "Kelvin is the base unit of temperature in the International System of Units (SI).",
    history: "Introduced by William Thomson (Lord Kelvin), used in scientific measurements."
  }
};

const fromTempInput = document.getElementById("fromTempUnit");
const toTempInput = document.getElementById("toTempUnit");
const tempValueInput = document.getElementById("tempValue");
const resultDiv = document.getElementById("result");
const descriptionText = document.getElementById("descriptionText");
const historyText = document.getElementById("historyText");
const historyList = document.getElementById("historyList");
const swapTempButton = document.getElementById("swapTemp");
const clearHistoryButton = document.getElementById("clearHistory");

let tempConversionHistory = JSON.parse(localStorage.getItem('tempConversionHistory')) || [];

function updateHistoryList() {
  historyList.innerHTML = ''; // Clear current list

  tempConversionHistory.forEach((conversion, index) => {
    let li = document.createElement("li");
    li.textContent = conversion;

    // Add delete button for each history item
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-history-item");
    deleteButton.addEventListener("click", function(event) {
      event.stopPropagation();
      deleteTempHistoryItem(index);
    });
    li.appendChild(deleteButton);

    historyList.appendChild(li);
  });
}

function deleteTempHistoryItem(index) {
  tempConversionHistory.splice(index, 1);
  localStorage.setItem('tempConversionHistory', JSON.stringify(tempConversionHistory));
  updateHistoryList();
}

function convertTemp() {
  const value = parseFloat(tempValueInput.value);
  const fromUnit = fromTempInput.value;
  const toUnit = toTempInput.value;

  if (isNaN(value) || !(fromUnit in unitInfo) || !(toUnit in unitInfo)) {
    resultDiv.textContent = "Please enter a valid number and select valid units.";
    return;
  }

  let result;
  if (fromUnit === toUnit) {
    result = value;
  } else {
    // Convert from source to Celsius
    let celsius;
    if (fromUnit === "Celsius") celsius = value;
    else if (fromUnit === "Fahrenheit") celsius = (value - 32) * 5 / 9;
    else if (fromUnit === "Kelvin") celsius = value - 273.15;

    // Convert Celsius to target
    if (toUnit === "Celsius") result = celsius;
    else if (toUnit === "Fahrenheit") result = (celsius * 9 / 5) + 32;
    else if (toUnit === "Kelvin") result = celsius + 273.15;
  }

  const resultText = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
  resultDiv.textContent = resultText;

  descriptionText.textContent = unitInfo[fromUnit].description || "No description available.";
  historyText.textContent = unitInfo[fromUnit].history || "No history available.";

  tempConversionHistory.push(resultText);
  localStorage.setItem('tempConversionHistory', JSON.stringify(tempConversionHistory));
  updateHistoryList();
}

swapTempButton.addEventListener('click', function() {
  [fromTempInput.value, toTempInput.value] = [toTempInput.value, fromTempInput.value];
  convertTemp();
});

clearHistoryButton.addEventListener('click', function() {
  tempConversionHistory = [];
  localStorage.removeItem('tempConversionHistory');
  updateHistoryList();
});

fromTempInput.addEventListener("input", convertTemp);
toTempInput.addEventListener("input", convertTemp);
tempValueInput.addEventListener("input", convertTemp);

convertTemp();
updateHistoryList();
