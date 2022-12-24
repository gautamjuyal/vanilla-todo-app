const addTodoBtn = document.getElementById("add-todo-btn");
const inputField = document.querySelector(".input-field");
const editTodoBtn = document.getElementById("edit");
const deleteTodoBtn = document.getElementById("delete");
const todoList = document.querySelector(".todo-list");

const TODO_LIST = [];

const noTodoMessage = document.createElement("p");
noTodoMessage.textContent = "No items found";

function addTodoHandler(event) {
  event.preventDefault();
  if (inputField.value.trim() === "") return;
  let newTodo = { id: +Math.random(), title: inputField.value };
  TODO_LIST.push(newTodo);
  createTodoComp(newTodo);
  inputField.value = "";
  if (todoList.contains(noTodoMessage) && TODO_LIST.length > 0)
    todoList.removeChild(noTodoMessage);
}

function createTodoComp(element) {
  const li = document.createElement("li");
  li.classList.add("todo-comp");
  li.id = element.id;
  const p = document.createElement("p");
  p.textContent = element.title;
  li.appendChild(p);
  const div = document.createElement("div");
  div.classList.add("buttons");
  li.appendChild(div);
  const btnEdit = document.createElement("button");
  btnEdit.textContent = "Edit";
  btnEdit.classList.add("edit");
  div.appendChild(btnEdit);
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.classList.add("delete");
  div.appendChild(btnDelete);

  btnDelete.addEventListener("click", deleteTodoHandler);

  todoList.appendChild(li);
}

function deleteTodoHandler(event) {
  const parentListEl = event.target.closest("li");
  todoList.removeChild(parentListEl);

  for (const el of TODO_LIST) {
    if (el.id === +parentListEl.id) TODO_LIST.splice(TODO_LIST.indexOf(el), 1);
  }

  console.log(TODO_LIST);

  if (TODO_LIST.length === 0) todoList.appendChild(noTodoMessage);

  //   console.log(TODO_LIST);

  // const tbdEl = event.target.nearest('li');
  // if(id === tbdEl.id)
  //   todoList.removeChild(tbdEl);
}

if (TODO_LIST.length === 0) todoList.appendChild(noTodoMessage);

addTodoBtn.addEventListener("click", addTodoHandler);
