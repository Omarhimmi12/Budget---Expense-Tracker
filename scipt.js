let incomes = [];
let expenses = [];

function saveToStorage() {
  localStorage.setItem("incomes", JSON.stringify(incomes));
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadFromStorage() {
  incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
}

function addIncome() {
  const sourceInput = document.getElementById("source");
  const amountInput = document.getElementById("amount");

  const source = sourceInput.value.trim();
  const amount = Number(amountInput.value);

  if (source === "" || isNaN(amount) || amount <= 0) {
    document.getElementById("income-error").textContent = "Please check both fields";
    return;
  }

  incomes.push({
    id: Date.now(),
    source,
    amount
  });

  saveToStorage();
  displayIncomes();
  calculateSummary();

  sourceInput.value = "";
  amountInput.value = "";
  document.getElementById("income-error").textContent = "";
}

function displayIncomes() {
  const ul = document.getElementById("income-list");
  ul.innerHTML = "";

  incomes.forEach(i => {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span>${i.source} - ${i.amount} $</span>
        <button class="btn btn-danger btn-sm" onclick="deleteIncome(${i.id})">X</button>
      </li>
    `;
  });

  document.getElementById("incomeCount").textContent = incomes.length;
}

function deleteIncome(id) {
  incomes = incomes.filter(i => i.id !== id);
  saveToStorage();
  displayIncomes();
  calculateSummary();
}

function addExpense() {
  const categoryInput = document.getElementById("category");
  const expenseInput = document.getElementById("expense");

  const category = categoryInput.value.trim();
  const amount = Number(expenseInput.value);

  if (category === "" || isNaN(amount) || amount <= 0) {
    document.getElementById("expense-error").textContent = "Please check both fields";
    return;
  }

  expenses.push({
    id: Date.now(),
    category,
    amount
  });

  saveToStorage();
  displayExpenses();
  calculateSummary();

  categoryInput.value = "";
  expenseInput.value = "";
  document.getElementById("expense-error").textContent = "";
}

function displayExpenses() {
  const ul = document.getElementById("expense-list");
  ul.innerHTML = "";

  expenses.forEach(e => {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span>${e.category} - ${e.amount} $</span>
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${e.id})">X</button>
      </li>
    `;
  });

  document.getElementById("expenseCount").textContent = expenses.length;
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  saveToStorage();
  displayExpenses();
  calculateSummary();
}

function calculateSummary() {
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent = totalIncome;
  document.getElementById("total-expenses").textContent = totalExpenses;

  const balanceEl = document.getElementById("balance");
  balanceEl.textContent = balance;
  balanceEl.style.color =
    balance >= 5000 ? "green" : balance >= 1000 ? "orange" : "red";
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  displayIncomes();
  displayExpenses();
  calculateSummary();
});
