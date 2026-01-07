const weightFactors = {
  "mg": { toKg: 1e-6, description: "One-thousandth of a gram", history: "Used for tiny weights in chemistry and medicine." },
  "g": { toKg: 0.001, description: "Metric base unit for weight", history: "Part of the metric system established in France." },
  "kg": { toKg: 1, description: "Standard metric unit", history: "Adopted globally for mass by SI (International System)." },
  "t": { toKg: 1000, description: "1,000 kilograms", history: "Used for heavy cargo or industrial measurements." },
  "oz": { toKg: 0.0283495, description: "1/16 of a pound", history: "Commonly used for food and postal items in US." },
  "lb": { toKg: 0.453592, description: "Common in the US", history: "Standard weight in the Imperial system." },
  "st": { toKg: 6.35029, description: "14 pounds, used in UK", history: "Used in Britain to measure human body weight." },
  "us_ton": { toKg: 907.18474, description: "2,000 pounds (short ton)", history: "Primarily used in the US." },
  "uk_ton": { toKg: 1016.0469, description: "2,240 pounds (long ton)", history: "Used mainly in the UK before metrication." }
};

const fromWeightInput = document.getElementById("fromWeightUnit");
const toWeightInput = document.getElementById("toWeightUnit");
const weightValueInput = document.getElementById("weightValue");
const resultDiv = document.getElementById("result");
const descriptionText = document.getElementById("descriptionText");
const historyText = document.getElementById("historyText");
const historyList = document.getElementById("historyList");
const swapWeightButton = document.getElementById("swapWeight");
const clearHistoryButton = document.getElementById("clearHistory");

let weightConversionHistory = JSON.parse(localStorage.getItem('weightConversionHistory')) || [];

function updateHistoryList() {
  historyList.innerHTML = ''; // Clear current list

  weightConversionHistory.forEach((conversion, index) => {
    let li = document.createElement("li");
    li.textContent = conversion;

    // Add delete button for each history item
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-history-item");
    deleteButton.addEventListener("click", function(event) {
      event.stopPropagation();
      deleteWeightHistoryItem(index);
    });
    li.appendChild(deleteButton);

    historyList.appendChild(li);
  });
}

function deleteWeightHistoryItem(index) {
  weightConversionHistory.splice(index, 1);
  localStorage.setItem('weightConversionHistory', JSON.stringify(weightConversionHistory));
  updateHistoryList();
}

function convertWeight() {
  const value = parseFloat(weightValueInput.value);
  const fromUnit = fromWeightInput.value;
  const toUnit = toWeightInput.value;

  if (!value || !(fromUnit in weightFactors) || !(toUnit in weightFactors)) {
    resultDiv.textContent = "Please enter a valid number and select valid units.";
    return;
  }

  const valueInKg = value * weightFactors[fromUnit].toKg;
  const converted = valueInKg / weightFactors[toUnit].toKg;

  const resultText = `${value} ${fromUnit} = ${converted.toFixed(8)} ${toUnit}`;
  resultDiv.textContent = resultText;

  descriptionText.textContent = weightFactors[fromUnit].description || "No description available.";
  historyText.textContent = weightFactors[fromUnit].history || "No history available.";

  weightConversionHistory.push(resultText);
  localStorage.setItem('weightConversionHistory', JSON.stringify(weightConversionHistory));
  updateHistoryList();
}

swapWeightButton.addEventListener('click', function() {
  [fromWeightInput.value, toWeightInput.value] = [toWeightInput.value, fromWeightInput.value];
  convertWeight();
});

clearHistoryButton.addEventListener('click', function() {
  weightConversionHistory = [];
  localStorage.removeItem('weightConversionHistory');
  updateHistoryList();
});

fromWeightInput.addEventListener("input", convertWeight);
toWeightInput.addEventListener("input", convertWeight);
weightValueInput.addEventListener("input", convertWeight);

convertWeight();
updateHistoryList();
