let todoList = document.getElementsByTagName("ul")[0];
let todoObjects = [];

class todoItem {
  constructor(name, count = 1) {
    this._name = name;
    this._count = count;
    //this._clicked = clicked; 
  }

  get name() {
    return this._name;
  }

  get count() {
    return this._count;
  }

  /*get clicked() {
    return this._clicked;
  }*/

  addItem() {
    this._count++;
  }

  /*removeItem() {
    this._count--;
    // handle the case where we have 0 or fewer items
  }*/
}

function newItem(event) {
  let task = addTask.elements[0];
  // create an object for the current task
  let index = todoObjects.findIndex(item => item.name === task.value);

  // check if that task exists; if so, just add another one
  if (index >= 0) {
    todoObjects[index].addItem();
    let todo = document.getElementById(task.value);
    let todoText = todo.querySelector(".todo-text");
    todoText.textContent = `(${todoObjects[index].count}) ${todoObjects[index].name}`;
  } else {
    createItem(event, task.value);
  }

  // remove the task from the input box
  task.value = "";

  // keep the page from reloading
  event.preventDefault();
}

function createItem(event, name) {
  let todo = new todoItem(name);

  // add task object to the list
  todoObjects.push(todo);

  // create a task for the list
  let li = document.createElement('li');
  todoList.appendChild(li);
  li.id = `${todo.name}`;
  li.className = "unchecked";

  // create the checkmark image
  let doneContainer = document.createElement('div');
  doneContainer.className = "done";
  li.appendChild(doneContainer);
  let doneImage = document.createElement('img');
  doneImage.src="./images/check.png";
  doneImage.alt="green checkmark";
  doneContainer.appendChild(doneImage);

  // create the task text
  let taskContainer = document.createElement('div');
  taskContainer.className = "todo-text";
  taskContainer.textContent = `${todo.name}`;
  li.appendChild(taskContainer);

  // create the delete image
  let deleteContainer = document.createElement('div');
  deleteContainer.className = "delete";
  li.appendChild(deleteContainer);
  let deleteImage = document.createElement('img');
  deleteImage.src = "./images/x.png";
  deleteImage.alt = "red x";
  deleteContainer.appendChild(deleteImage);

  doneContainer.addEventListener("click", checkItem);
  taskContainer.addEventListener("click", checkItem);
  deleteContainer.addEventListener("click", deleteItem);

  // keep the page from reloading
  event.preventDefault();
}

function checkItem(event) {
  let task = this.parentNode;
  if (task.className === "checked") {
    task.className = "unchecked";
  } else if (task.className === "unchecked") {
    task.className = "checked";
  }

  // keep the page from reloading
  event.preventDefault();
}

function deleteItem(event) {
  let task = this.parentNode;
  let taskName = task.id;

  // remove the clicked object from the array
  let index = todoObjects.findIndex(item => item.name === taskName);
  if (index >= 0) {
    todoObjects.splice(index, 1);
  }

  // remove the list element from the DOM
  task.remove();

  // keep the page from reloading
  event.preventDefault();
}

function trashAll(event) {
  // remove all todo objects
  todoObjects = [];

  let ul = document.getElementsByTagName("ul")[0];
  ul.innerHTML = "";

  // keep the page from reloading
  event.preventDefault();
}


let addTask = document.getElementById("add-task");
addTask.addEventListener("submit", newItem);

let deleteAll = document.getElementById("delete-all");
deleteAll.addEventListener("click", trashAll);