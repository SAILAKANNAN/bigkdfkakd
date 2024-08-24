function updateBubbles() {
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble) => {
    bubble.textContent = Math.floor(Math.random() * 10);
  });
}

// Update the bubbles every minute
setInterval(updateBubbles, 60000);

// Initial update on page load
updateBubbles();

function startTimer(duration, displayMinutes, displaySeconds) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    displayMinutes.textContent = minutes;
    displaySeconds.textContent = seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  let oneMinute = 60,
    displayMinutes = document.querySelector("#minutes"),
    displaySeconds = document.querySelector("#seconds");
  startTimer(oneMinute, displayMinutes, displaySeconds);
};

function startTimer(duration, display) {
  var timeer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timeer / 60, 10);
    seconds = parseInt(timeer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timeer < 0) {
      timeer = duration; // Reset the timeer
    }
  }, 1000);
}

window.onload = function () {
  var oneMinute = 60; // Duration in seconds
  var display = document.querySelector("#timeer");
  startTimer(oneMinute, display);
};

let periodBase = 20240817301159;
const rowsPerPage = 10;
const totalRows = 300;
const totalPages = Math.ceil(totalRows / rowsPerPage);
let currentPage = 0;

function updateTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear existing rows

  const start = currentPage * rowsPerPage;
  const end = Math.min(start + rowsPerPage, totalRows);

  for (let i = start; i < end; i++) {
    const period = (periodBase + i).toString();
    const number = Math.floor(Math.random() * 10);
    const bigSmall = number >= 5 ? "Big" : "Small";
    const colorClass = number % 2 === 0 ? "green" : "red";

    const row = `<tr>
                        <td>${period}</td>
                        <td class="number-cell" style="color:${colorClass}">${number}</td>
                        <td>${bigSmall}</td>
                        <td><span class="dot ${colorClass}"></span></td>
                     </tr>`;
    tableBody.innerHTML += row;
  }
}

function updatePaginationButtons() {
  document.getElementById("prev-btn").disabled = currentPage === 0;
  document.getElementById("next-btn").disabled =
    (currentPage + 1) * rowsPerPage >= totalRows;
  document.getElementById("page-count").innerText = ` ${
    currentPage + 1
  }/${totalPages}`;
}

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updateTable();
    updatePaginationButtons();
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if ((currentPage + 1) * rowsPerPage < totalRows) {
    currentPage++;
    updateTable();
    updatePaginationButtons();
  }
});

// Initial call to populate table
updateTable();
updatePaginationButtons();
