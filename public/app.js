// declaring my variables
const inpVal = document.querySelector(".value")
const btnSubmit = document.querySelector(".btn-submit")
const itemsContainer = document.querySelector(".items")
const contentBox = document.querySelector(".content-box")
const clearBtn = document.querySelector(".clear-btn")
const alertt = document.querySelector(".alert")
const form = document.querySelector(".form-class")

// declearing edit variables
let editID = ""
let editFlag = false
let editElement;

// On form Submit
form.addEventListener("submit", addItem)
window.addEventListener("DOMContentLoaded", setUpItems)

function addItem(e){
    e.preventDefault()
    let value = inpVal.value
    let id = new Date().getTime().toString()

    if(value!=="" && editFlag == false){
        createListItem(id, value)
        contentBox.classList.add("wipe")
        displayAlert("Item Added", "alert-success")
        addToLocalStorage(id, value)
        restoreToDefault()
    }else if(value!=="" && editFlag == true){
        editElement.innerHTML = value
        displayAlert("Item edited", "alert-success")
        editInLocalStorage(editID, value)
        restoreToDefault()
    }else{
        displayAlert("Input field cannot be empty", "alert-danger")
    }

}

clearBtn.addEventListener("click", clearItems)

function clearItems(){
    const itemContainer = document.querySelectorAll(".item")
    if(itemContainer.length > 0){
        itemContainer.forEach(function(item){
            itemsContainer.removeChild(item)
        })
    }
    contentBox.classList.remove("wipe")
    clearAll()
    displayAlert("All items cleared", "alert-danger")
    restoreToDefault()
    
} 
function deleteItem(e){
    parent = e.currentTarget.parentElement.parentElement
    const id = parent.dataset.id
    itemsContainer.removeChild(parent)
    const items = document.querySelector(".items")
    if(items.children.length == 0){
        contentBox.classList.remove("wipe")
    }
    displayAlert("Item deleted", "alert-danger")
    removeFromLocalStorage(id)
    restoreToDefault()
}
function editItem(e){
    parent = e.currentTarget.parentElement.parentElement
    editID = parent.dataset.id
    editElement = e.currentTarget.parentElement.previousElementSibling
    inpVal.value = editElement.textContent
    editFlag = true
    btnSubmit.innerHTML = "Edit"

}
function displayAlert(text, color){
    alertt.textContent = text
    alertt.classList.add(color)
    setTimeout(function(){
        alertt.textContent = ""
        alertt.classList.remove(color)
    }, 1000)
}
function restoreToDefault(){
    form.reset()
    editID = ""
    editFlag = false
    btnSubmit.innerHTML = "Add"
}
function addToLocalStorage(id, value){
    const todo = {id, value}
    let items = getLocalStorage()
    console.log(items)

    items.push(todo)
    localStorage.setItem("list", JSON.stringify(items))
}
function removeFromLocalStorage(id){
    let items = getLocalStorage()

    items = items.filter((item)=>{
        if(item.id !== id){
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items))
}
function editInLocalStorage(id, value){
    let items = getLocalStorage()
    items = items.map(function(item){
        if(item.id === id){
            item.value = value
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items))
}
function setUpItems(){
    let items = getLocalStorage()
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value)
        })
    }
    if(items.length == 0){
        contentBox.classList.remove("wipe")
    }else{
        contentBox.classList.add("wipe")
    }
}
function clearAll(){
    localStorage.removeItem("list")
}
function getLocalStorage(){
    if(localStorage.getItem("list")){
        return JSON.parse(localStorage.getItem("list"))
    }else{
        return []
    }
}
function createListItem(id, value){
    let element = document.createElement("div")
    element.classList.add("item")
    let attr = document.createAttribute("data-id")
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `
        <span class="item-content">${value}</span>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `
    itemsContainer.appendChild(element)
    
    const deleteBtns = document.querySelectorAll(".delete")
    deleteBtns.forEach(function(deleteBtn){
        deleteBtn.addEventListener("click", deleteItem)
    })

    const editBtns = document.querySelectorAll(".edit")
    editBtns.forEach(function(editBtn){
        editBtn.addEventListener("click", editItem)
    })

}