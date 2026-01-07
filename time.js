const units = {
  "Second": {
    factor: 1,
    description: "The base unit of time in the SI system.",
    history: "Originally defined as 1/86400 of a day."
  },
  "Minute": {
    factor: 60,
    description: "Common unit of time equal to 60 seconds.",
    history: "Derived from the sexagesimal system (base 60) used by the Babylonians."
  },
  "Hour": {
    factor: 3600,
    description: "Common time unit equal to 60 minutes.",
    history: "Based on divisions of the day dating back to ancient Egypt."
  },
  "Day": {
    factor: 86400,
    description: "Time taken for one rotation of Earth.",
    history: "Used universally since the beginning of timekeeping."
  },
  "Week": {
    factor: 604800,
    description: "7 days.",
    history: "Originated from ancient Babylonian calendars."
  },
  "Month": {
    factor: 2629746,
    description: "Average month (30.44 days).",
    history: "Based on lunar cycles."
  },
  "Year": {
    factor: 31556952,
    description: "Average Gregorian year (365.25 days).",
    history: "Based on Earth's revolution around the Sun."
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

// Populate datalists
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

function convertTime() {
  const value = parseFloat(valueInput.value);
  const from = formatUnit(fromInput.value);
  const to = formatUnit(toInput.value);

  if (isNaN(value) || !from || !to || !units[from] || !units[to]) {
    resultDisplay.innerText = "Result:";
    return;
  }

  const inSeconds = value * units[from].factor;
  const result = inSeconds / units[to].factor;

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
    deleteTimeHistoryItem(historyList.children.length - 1);
  });
  historyItem.appendChild(deleteButton);

  historyList.appendChild(historyItem);
}

function deleteTimeHistoryItem(index) {
  const historyItems = historyList.children;
  if (index >= 0 && index < historyItems.length) {
    historyList.removeChild(historyItems[index]);
  }
}

document.getElementById("swapButton").addEventListener("click", () => {
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
  convertTime();
});

valueInput.addEventListener("input", convertTime);
fromInput.addEventListener("input", convertTime);
toInput.addEventListener("input", convertTime);

document.getElementById("clearHistory").addEventListener("click", () => {
  historyList.innerHTML = "";
});
