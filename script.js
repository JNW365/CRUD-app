// Global Variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('modal-trigger');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
const modal = document.getElementById('myModal');
const modalClose = document.getElementById('cancel');
const clearAll = document.getElementById('clear-all')
let isEditMode = false;

// Functions for modal

// Open modal
let openModal = () => {
    modal.style.visibility = 'visible';
}
// Close modal
let closeModal = () => {
    modal.style.visibility = 'hidden';
}


// Function to display items
let displayItems = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}


// Function to add item
let onAddItemSubmit = (e) => {
    e.preventDefault();
    const newItem = itemInput.value; 
    // Validate Input 
    if (newItem === '') {
       alert('Please add an item');
       return; 
    }
    // Check for edit mode
    if (isEditMode) {
       const itemToEdit = itemList.querySelector('.edit-mode');

       removeItemFromStorage(itemToEdit.textContent);
       itemToEdit.classList.remove('edit-mode');
       itemToEdit.remove();
       isEditMode = false;
    } else {
        if(checkIfItemExists(newItem)) {
            alert('Item already on list');
            itemInput.value = '';
            return;
            
        }
    }



    // Create item DOM element
    addItemToDOM(newItem);
    // Add item to local storage
    addItemToStorage(newItem)
    checkUI();
    itemInput.value = '';
}
    // Add item to DOM
    let addItemToDOM = (item) => {
        // Create list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));

        const button = createButton('remove-item btn-link text-red');
        li.appendChild(button);
        // Add li to DOM
        itemList.appendChild(li);
    }
    // Function to add item to storage
    let addItemToStorage = (item) => {
        const itemsFromStorage = getItemsFromStorage();

        
        // Add new item to array
        itemsFromStorage.push(item);

        // Convert to JSON string and set to local storage
        localStorage.setItem('items', JSON.stringify(itemsFromStorage))

    }
// Function to get items from storage
    let getItemsFromStorage = () => {
        let itemsFromStorage;
        if(localStorage.getItem('items') === null) {
            itemsFromStorage = [];
        } else {
            itemsFromStorage = JSON.parse(localStorage.getItem('items'));
        } 
        return itemsFromStorage;
    }

// Function to create button

let createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-regular fa-square-minus');
    button.appendChild(icon);
    return button;
}
// Create button icon

let createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
// Remove item from local storage
let onClickItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
      removeItem(e.target.parentElement.parentElement);  
    } else {
        setItemToEdit(e.target)
    }
}
// Function to prevent duplicate items
let checkIfItemExists = (item) => {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}




// Function to set item to edit
let setItemToEdit = (item) => {
    isEditMode = true;
    
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pencil"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
    
}

// Function to remove item

let removeItem = (item) => {
    // Remove item from DOM
    item.remove();
    // Remove item from storage
    removeItemFromStorage(item.textContent)
    checkUI()
   
}
// Function to remove item from storage
let removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();
    console.log(itemsFromStorage)
    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function to clear all items

let clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    // Clear from localStorage
    localStorage.removeItem('items');

    checkUI()
}

// Function to filter items
let filterItems = (e) => {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }

    })
}

// Function to check UI 
let checkUI = () => {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block'; 
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

// Initialize app
let init = () => {
    // Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal)
itemFilter.addEventListener('input', filterItems);
clearAll.addEventListener('click', clearItems);
clearAll.addEventListener('click', closeModal);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
}

init();

