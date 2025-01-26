const todoInput = document.getElementById("todo");
const addTodo = document.getElementById("add");
const displayedTodos = document.getElementById("todos");
let todoCount = 0;

// Load todos from localStorage
const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => {
    displayedTodos.innerHTML += `<div id="todo-container-${todo.id}">
      <li id="todo-${todo.id}">${todo.text}</li>
      <button class="btn btn-danger" onclick="deleteTod(${todo.id})">Delete</button>
      <button class="btn btn-success" onclick="doneTod(${todo.id})">Done</button>
    </div>`;
    todoCount = Math.max(todoCount, todo.id + 1);
  });
};

// Save todos to localStorage
const saveTodos = () => {
  const todos = [];
  displayedTodos.querySelectorAll("li").forEach(li => {
    const id = parseInt(li.id.split("-")[1]);
    const text = li.textContent;
    todos.push({ id, text });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Display todo
const displayTodo = () => {
  const todoInputValue = todoInput.value;
  if (todoInputValue) {
    displayedTodos.innerHTML += `<div id="todo-container-${todoCount}">
      <li id="todo-${todoCount}">${todoInputValue}</li>
      <button class="btn btn-danger" onclick="deleteTod(${todoCount})">Delete</button>
      <button class="btn btn-success" onclick="doneTod(${todoCount})">Done</button>
    </div>`;
    todoCount++;
    saveTodos();
  } else {
    alert("Please enter a todo");
  }
  todoInput.value = "";
};

// Add todo on button click
addTodo.addEventListener("click", () => {
  displayTodo();
});

// Add todo on enter key press
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    displayTodo();
  }
});

// Delete todo
function deleteTod(id) {
  const todoContainer = document.getElementById(`todo-container-${id}`);
  if (todoContainer) {
    todoContainer.remove();
    saveTodos();
  }
}

// Done todo
function doneTod(id) {
  const todoItem = document.getElementById(`todo-${id}`);
  if (todoItem) {
    todoItem.style.textDecoration = "line-through";
  }
}

// Load todos when the page is loaded
window.addEventListener("load", loadTodos);
