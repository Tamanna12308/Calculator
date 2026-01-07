const units = {
  "Cubic Meter": {
    factor: 1,
    description: "SI unit of volume.",
    history: "Introduced as part of the metric system in France during the 1790s."
  },
  "Liter": {
    factor: 0.001,
    description: "Common unit for liquids.",
    history: "Originally defined as the volume of 1 kilogram of water."
  },
  "Milliliter": {
    factor: 0.000001,
    description: "One-thousandth of a liter.",
    history: "Derived from the metric system for smaller volumes."
  },
  "Cubic Centimeter": {
    factor: 0.000001,
    description: "Equal to one milliliter.",
    history: "Used commonly in scientific measurements."
  },
  "Cubic Inch": {
    factor: 0.0000163871,
    description: "Imperial unit used in US and UK.",
    history: "Used in engineering and industrial contexts."
  },
  "Cubic Foot": {
    factor: 0.0283168,
    description: "Imperial unit equal to 12x12x12 inches.",
    history: "Historically used in construction and shipping."
  },
  "Cubic Yard": {
    factor: 0.764555,
    description: "Used for measuring larger volumes.",
    history: "Traditional British unit of volume."
  },
  "Gallon (US)": {
    factor: 0.00378541,
    description: "Common in the United States.",
    history: "Based on Queen Anne's wine gallon."
  },
  "Gallon (UK)": {
    factor: 0.00454609,
    description: "Used in the UK and some Commonwealth countries.",
    history: "Defined in 1824 as the volume of 10 pounds of water."
  }
};

const fromInput = document.getElementById("fromUnitInput");
const toInput = document.getElementById("toUnitInput");
const valueInput = document.getElementById("value");
const resultDisplay = document.getElementById("result");
const descriptionText = document.getElementById("descriptionText");
const historyText = document.getElementById("historyText");
const historyList = document.getElementById("historyList");

const fromList = document.getElementById("fromUnitList");
const toList = document.getElementById("toUnitList");

Object.keys(units).forEach(unit => {
  const option1 = document.createElement("option");
  option1.value = unit;
  fromList.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = unit;
  toList.appendChild(option2);
});

function formatUnit(input) {
  return Object.keys(units).find(
    key => key.toLowerCase() === input.trim().toLowerCase()
  );
}

function convertVolume() {
  const value = parseFloat(valueInput.value);
  const from = formatUnit(fromInput.value);
  const to = formatUnit(toInput.value);

  if (isNaN(value) || !from || !to || !(from in units) || !(to in units)) {
    resultDisplay.innerText = "Result:";
    return;
  }

  const inCubicMeters = value * units[from].factor;
  const result = inCubicMeters / units[to].factor;

  resultDisplay.innerText = `Result: ${result.toFixed(8)} ${to}`;

  descriptionText.innerText = units[from].description;
  historyText.innerText = units[from].history;

  const historyItem = document.createElement("li");
  historyItem.innerText = `${value} ${from} → ${result.toFixed(8)} ${to}`;

  // Add delete button for each history item
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-history-item");
  deleteButton.addEventListener("click", function(event) {
    event.stopPropagation();
    deleteVolumeHistoryItem(historyList.children.length - 1);
  });
  historyItem.appendChild(deleteButton);

  historyList.appendChild(historyItem);
}

function deleteVolumeHistoryItem(index) {
  const historyItems = historyList.children;
  if (index >= 0 && index < historyItems.length) {
    historyList.removeChild(historyItems[index]);
  }
}

document.getElementById("swapButton").addEventListener("click", () => {
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
  convertVolume();
});

valueInput.addEventListener("input", convertVolume);
fromInput.addEventListener("input", convertVolume);
toInput.addEventListener("input", convertVolume);

document.getElementById("clearHistory").addEventListener("click", () => {
  historyList.innerHTML = "";
});
