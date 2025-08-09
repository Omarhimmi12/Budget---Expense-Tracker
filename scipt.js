// Incomes
var incomes = [];

function addIncome() {  
    const sourceInput = document.getElementById("source");
    const amountInput = document.getElementById("amount");
    let source = sourceInput.value.trim();
    let amount = Number(amountInput.value);
    
    if ((source === "" || isNaN(amount)) || amount <= 0) {
    document.getElementById("income-error").innerHTML = "Please check both fields"; 
    return;
    }             

    const income = {
    id: Date.now(),
    source: source,
    amount: amount
    };

    incomes.push(income);        
    displayIncomes();
    document.getElementById("income-error").innerHTML = "";
    sourceInput.value = "";
    amountInput.value = "";
    calculateSummary();
}

function displayIncomes() {    
    const ul = document.getElementById('income-list');
    ul.innerHTML = '';
    incomes.forEach(income => {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `
        <div><span>${income.source}</span> - <span>${income.amount} $</span></div>
        <div>
        <button onclick="deleteIncome(${income.id})" class="btn btn-danger">X</button>
        </div>`;
    ul.append(li);
    });
    document.getElementById("incomeCount").textContent = incomes.length;
    calculateSummary();
}

function deleteIncome(id) {
    incomes = incomes.filter(income => income.id !== id);
    displayIncomes();
    calculateSummary();
}

// Expenses
var expenses = [];

function addExpense() {  
    const categoryInput = document.getElementById("category");
    const expenseInput = document.getElementById("expense");
    let category = categoryInput.value.trim();
    let amount = Number(expenseInput.value);
    
    if ((category === "" || isNaN(amount)) || amount <= 0) {
    document.getElementById("expense-error").innerHTML = "Please check both fields"; 
    return;
    }             

    const expense = {
    id: Date.now(),
    category: category,
    amount: amount
    };

    expenses.push(expense);        
    document.getElementById("expense-error").innerHTML = "";
    categoryInput.value = "";
    expenseInput.value = "";
    displayExpenses();
    calculateSummary();    
}

function displayExpenses() {    
    const ul = document.getElementById('expense-list');
    ul.innerHTML = "";
    expenses.forEach(expense => {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `
        <div><span>${expense.category}</span> - <span>${expense.amount} $</span></div>      
        <span>
        <button onclick="deleteExpense(${expense.id})" class="btn btn-danger">X</button>
        </span>`;
    ul.append(li);
    });
    document.getElementById("expenseCount").textContent = expenses.length;
    calculateSummary();
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    displayExpenses();
    calculateSummary();
}

// Summary & Calculations
function calculateSummary() {
    let totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    let totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    let balance = totalIncome - totalExpenses;

    document.getElementById("total-income").textContent = totalIncome;
    document.getElementById("total-expenses").textContent = totalExpenses;

    const balanceElement = document.getElementById("balance");
    balanceElement.textContent = balance;

    if (balance >= 5000) {
    balanceElement.style.color = "green";
    } else if (balance >= 1000) {
    balanceElement.style.color = "orange";
    } else {
    balanceElement.style.color = "red";
    }
}