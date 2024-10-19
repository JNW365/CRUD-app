// Global Variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

// Function to add item

let addItem = (e) => {
    e.preventDefault();
    const newItem = itemInput.value; 
    // Validate Input 
    if (newItem === '') {
       alert('Please add an item');
       return; 
    }
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    
    itemList.appendChild(li);
    itemInput.value = '';
}

// Function to create button

let createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-sharp fa-solid fa-circle-minus');
    button.appendChild(icon);
    return button;
}
// Create button icon

let createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}




// Event Listeners
itemForm.addEventListener('submit', addItem);


