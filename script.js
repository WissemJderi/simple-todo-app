const todoInput = document.getElementById("todo");
const addTodo = document.getElementById("add");
const displayedTodos = document.getElementById("todos");
const todoCounter = document.getElementById("todo-counter");
let todoCount = 0;

// Load todos from localStorage
const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    displayedTodos.innerHTML += `<div id="todo-container-${todo.id}">
      <li id="todo-${todo.id}" style="text-decoration: ${
      todo.done ? "line-through" : "none"
    }">${todo.text}</li>
      <button onclick="deleteTod(${todo.id})">Delete</button>
      <button onclick="doneTod(${todo.id})">Done</button>
      <button onclick="editTod(${todo.id})">Edit</button>
    </div>`;
    todoCount = Math.max(todoCount, todo.id + 1);
  });
  updateCounter();
};

// Save todos to localStorage
const saveTodos = () => {
  const todos = [];
  displayedTodos.querySelectorAll("li").forEach((li) => {
    const id = parseInt(li.id.split("-")[1]);
    const text = li.textContent;
    const done = li.style.textDecoration === "line-through";
    todos.push({ id, text, done });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  updateCounter();
};

// Display todo
const displayTodo = () => {
  const todoInputValue = todoInput.value;
  if (todoInputValue) {
    displayedTodos.innerHTML += `<div id="todo-container-${todoCount}">
      <li id="todo-${todoCount}">${todoInputValue}</li>
      <button  onclick="deleteTod(${todoCount})">Delete</button>
      <button  onclick="doneTod(${todoCount})">Done</button>
      <button  onclick="editTod(${todoCount})">Edit</button>
    </div>`;
    todoCount++;
    saveTodos();
  } else {
    alert("Please enter a todo");
  }
  todoInput.value = "";
};

// Update the counter
const updateCounter = () => {
  const remainingTodos = displayedTodos.querySelectorAll("li").length;
  todoCounter.textContent = `Remaining todos: ${remainingTodos}`;
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
    todoItem.style.textDecoration =
      todoItem.style.textDecoration === "line-through"
        ? "none"
        : "line-through";
    saveTodos();
  }
}

// Edit todo
function editTod(id) {
  const todoItem = document.getElementById(`todo-${id}`);
  if (todoItem) {
    const newText = prompt("Edit your todo:", todoItem.textContent);
    if (newText !== null && newText.trim() !== "") {
      todoItem.textContent = newText;
      saveTodos();
    }
  }
}

// Load todos when the page is loaded
window.addEventListener("load", loadTodos);
