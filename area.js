const areaInfo = {
  "Square Meter": {
    factor: 1,
    description: "The square meter is the SI derived unit of area.",
    history: "It is used globally and is defined as the area of a square with sides of 1 meter."
  },
  "Square Kilometer": {
    factor: 1e6,
    description: "A square kilometer is equal to 1,000,000 square meters.",
    history: "Used to measure large land areas, commonly in geography."
  },
  "Square Mile": {
    factor: 2.59e6,
    description: "A square mile is a unit of area used in the U.S. and U.K.",
    history: "Commonly used to measure large tracts of land."
  },
  "Square Yard": {
    factor: 0.836127,
    description: "A square yard is equal to 9 square feet.",
    history: "Primarily used in the U.S. and U.K. for floor areas and fabrics."
  },
  "Square Foot": {
    factor: 0.092903,
    description: "A square foot is a U.S. customary unit of area.",
    history: "Widely used in real estate and architecture."
  },
  "Acre": {
    factor: 4046.86,
    description: "An acre is commonly used for land measurement in the U.S.",
    history: "Historically based on the amount of land tillable by one man behind an ox in one day."
  },
  "Hectare": {
    factor: 10000,
    description: "A hectare is equal to 10,000 square meters.",
    history: "Used in land measurement, especially in agriculture."
  }
};

const fromInput = document.getElementById("fromAreaUnit");
const toInput = document.getElementById("toAreaUnit");
const valueInput = document.getElementById("areaValue");
const resultDisplay = document.getElementById("result");
const descriptionText = document.getElementById("descriptionText");
const historyText = document.getElementById("historyText");
const historyList = document.getElementById("historyList");
const swapButton = document.getElementById("swapArea");
const clearHistoryButton = document.getElementById("clearHistory");

let areaConversionHistory = JSON.parse(localStorage.getItem('areaConversionHistory')) || [];

function updateHistoryList() {
  historyList.innerHTML = ''; // Clear current list

  areaConversionHistory.forEach((conversion, index) => {
    let li = document.createElement("li");
    li.textContent = conversion;

    // Add delete button for each history item
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-history-item");
    deleteButton.addEventListener("click", function(event) {
      event.stopPropagation();
      deleteAreaHistoryItem(index);
    });
    li.appendChild(deleteButton);

    historyList.appendChild(li);
  });
}

function deleteAreaHistoryItem(index) {
  areaConversionHistory.splice(index, 1);
  localStorage.setItem('areaConversionHistory', JSON.stringify(areaConversionHistory));
  updateHistoryList();
}

swapButton.addEventListener('click', function() {
  [fromInput.value, toInput.value] = [toInput.value, fromInput.value];
  convertArea();
  updateInfo(fromInput.value);
});

valueInput.addEventListener("input", convertArea);
fromInput.addEventListener("input", () => {
  convertArea();
  updateInfo(fromInput.value);
});
toInput.addEventListener("input", convertArea);

clearHistoryButton.addEventListener('click', function() {
  areaConversionHistory = [];
  localStorage.removeItem('areaConversionHistory');
  updateHistoryList();
});

function convertArea() {
  const value = parseFloat(valueInput.value);
  const from = fromInput.value;
  const to = toInput.value;

  if (isNaN(value) || !areaInfo[from] || !areaInfo[to]) {
    resultDisplay.innerText = "Result:";
    return;
  }

  const inSquareMeters = value * areaInfo[from].factor;
  const result = inSquareMeters / areaInfo[to].factor;

  resultDisplay.innerText = `Result: ${result.toFixed(8)} ${to}`;

  const historyItem = document.createElement("li");
  historyItem.innerText = `${value} ${from} → ${result.toFixed(8)} ${to}`;

  // Add delete button for each history item
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-history-item");
  deleteButton.addEventListener("click", function(event) {
    event.stopPropagation();
    deleteAreaHistoryItem(historyList.children.length - 1);
  });
  historyItem.appendChild(deleteButton);

  historyList.appendChild(historyItem);

  areaConversionHistory.push(historyItem.innerText);
  localStorage.setItem('areaConversionHistory', JSON.stringify(areaConversionHistory));
}

function updateInfo(unit) {
  if (areaInfo[unit]) {
    descriptionText.innerText = areaInfo[unit].description;
    historyText.innerText = areaInfo[unit].history;
  } else {
    descriptionText.innerText = "Select a unit to view its description.";
    historyText.innerText = "Select a unit to view its history.";
  }
}

updateHistoryList();
