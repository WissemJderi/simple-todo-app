const todoInput = document.getElementById("todo");
const addTodo = document.getElementById("add");
const displayedTodos = document.getElementById("todos");
const deleteTodo = document.getElementById("delete-todo");

// Display todo
const displayTodo = () => {
  const todoInputValue = todoInput.value;
  if (todoInputValue) {
    displayedTodos.innerHTML += `<li>${todoInputValue}</li>
  <button class="btn btn-danger" id="delete-todo" onclick="deleteTod()" >Delete</button>
  `;
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
function deleteTod() {
  displayedTodos.innerHTML = "";
}
