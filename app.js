// App State variables
let totalBudget = 1000;
let totalSpent = 0;
let shoppingList = [];

// DOM Elements
const budgetInput = document.getElementById('total-budget');
const itemSelect = document.getElementById('item-select');
const itemQty = document.getElementById('item-qty');
const addItemBtn = document.getElementById('add-item-btn');
const listDisplay = document.getElementById('shopping-list');

const displayBudget = document.getElementById('display-budget');
const displaySpent = document.getElementById('display-spent');
const displayRemaining = document.getElementById('display-remaining');

// Update Summary Text
function updateSummary() {
    totalBudget = parseFloat(budgetInput.value) || 0;
    totalSpent = shoppingList.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let remaining = totalBudget - totalSpent;

    displayBudget.innerText = `₱${totalBudget.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    displaySpent.innerText = `₱${totalSpent.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    displayRemaining.innerText = `₱${remaining.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    // Color code remaining budget alert
    if (remaining < 0) {
        displayRemaining.style.color = '#ce1126'; // Red if over budget
    } else {
        displayRemaining.style.color = '#007a33'; // Green if safe
    }
}

// Render list elements to UI
function renderList() {
    listDisplay.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (x${item.qty})</span>
            <span>₱${(item.price * item.qty).toFixed(2)}</span>
        `;
        listDisplay.appendChild(li);
    });
}

// Event Listeners
budgetInput.addEventListener('input', updateSummary);

addItemBtn.addEventListener('click', () => {
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    const itemName = selectedOption.text.split(' - ')[0];
    const itemPrice = parseFloat(itemSelect.value);
    const qty = parseInt(itemQty.value) || 1;

    shoppingList.push({ name: itemName, price: itemPrice, qty: qty });
    
    renderList();
    updateSummary();
    itemQty.value = 1; // Reset quantity input box
});

// Prompt warning for the placeholder login
document.getElementById('login-btn').addEventListener('click', () => {
    alert("Login setup required! We need to connect this button to a backend database provider like Supabase next.");
});
