function runSimulation() {
  const result = income - expenses;
  const simOutput = document.getElementById("sim-output");
  simOutput.innerHTML = `
    <p><strong>Monthly Net Balance:</strong> $${result.toFixed(2)}</p>
    <p><strong>Yearly Projection:</strong> $${(result * 12).toFixed(2)}</p>
  `;
}
let income = 0;
let expenses = 0;

function saveIncome() {
  const salary = parseFloat(document.getElementById("salary").value) || 0;
  const other = parseFloat(document.getElementById("otherIncome").value) || 0;
  income = salary + other;
}

function saveExpenses() {
  const rent = parseFloat(document.getElementById("rent").value) || 0;
  const food = parseFloat(document.getElementById("food").value) || 0;
  const transport = parseFloat(document.getElementById("transport").value) || 0;
  expenses = rent + food + transport;
}
 function showSection(sectionId) {
      // Hide all sections
      document.querySelectorAll("main > section").forEach(sec => {
        sec.classList.add("hidden");
      });
      // Show the clicked one
      document.getElementById(sectionId).classList.remove("hidden");
    }
    window.onload = () => {
      showSection("home"); // Default section
    }
