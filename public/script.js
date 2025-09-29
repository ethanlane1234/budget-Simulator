function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll("main > section").forEach(sec => {
    sec.classList.add("hidden");
    });
    // Show the clicked one
    document.getElementById(sectionId).classList.remove("hidden");
}

function addRow(id) {
    const target = document.getElementById(id);

    // Create a container for the row
    const row = document.createElement("div");
    row.className = "flex items-center space-x-2";

    // Create the Label for the new dropdown
    const label = document.createElement("span");
    label.className = "w-32 font-medium text-gray-700";
    label.innerText = "Select type";

    // clone hidden dropdowns
    let dropdown;
    if (id === "income-rows") {
    dropdown = document.getElementById("income-select").cloneNode(true);
    } else {
    dropdown = document.getElementById("expense-select").cloneNode(true);
    }
    dropdown.removeAttribute("id"); // remove duplicate id
    dropdown.className = "flex-1 bg-blue-600 text-white px-2 py-2 rounded";

    // eventlistener
    dropdown.addEventListener("change", () => {
    label.innerText = dropdown.value ? dropdown.value : "Select type";
    });

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Amount";
    input.className = "flex-1 border rounded px-3 py-2";

    row.appendChild(label);
    row.appendChild(dropdown);
    row.appendChild(input);
    target.appendChild(row);
}

function saveAllData() {
    let data = { income: [], expenses: [] };

    // Collect income rows
    document.querySelectorAll("#income-rows > div").forEach(row => {
    const select = row.querySelector("select");
    const input = row.querySelector("input");
    if (select && select.value && input && input.value.trim() !== "") {
        data.income.push({
        type: select.value,
        amount: parseFloat(input.value)
        });
    }
    });

    // Collect expense rows
    document.querySelectorAll("#expense-rows > div").forEach(row => {
    const select = row.querySelector("select");
    const input = row.querySelector("input");
    if (select && select.value && input && input.value.trim() !== "") {
        data.expenses.push({
        type: select.value,
        amount: parseFloat(input.value)
        });
    }
    });

    // Save to localStorage
    localStorage.setItem("budgetData", JSON.stringify(data));
    alert("Data saved!\n" + JSON.stringify(data, null, 2));
}

function runSimulation() {
    const data = JSON.parse(localStorage.getItem("budgetData")) || { income: [], expenses: [] };

    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = data.expenses.reduce((sum, item) => sum + item.amount, 0);
    const net = totalIncome - totalExpenses;

    const simOutput = document.getElementById("sim-output");
    simOutput.innerHTML = `
    <p><strong>Total Income:</strong> $${totalIncome.toFixed(2)}</p>
    <p><strong>Total Expenses:</strong> $${totalExpenses.toFixed(2)}</p>
    <p><strong>Monthly Net Balance:</strong> $${net.toFixed(2)}</p>
    <p><strong>Yearly Projection:</strong> $${(net * 12).toFixed(2)}</p>
    `;
}

window.onload = () => {
    showSection("home"); // Default section
}