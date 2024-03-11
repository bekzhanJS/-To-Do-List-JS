window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const userName = localStorage.getItem("username") || "";
  nameInput.value = userName;

  nameInput.addEventListener("change", (event) => {
    localStorage.setItem("username", event.target.value);
  });

  const NewTodoForm = document.querySelector("#form");

  NewTodoForm.addEventListener("submit", (event) => {
    const todo = {
      content: event.target.elements.content.value,
      category: event.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    event.reset();
  });

  DisplayTodos();
});
const todoList = document.getElementById("todo-list");

// todoList.innerHTML = "";

function DisplayTodos() {
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const editbtn = document.createElement("button");
    const deletebtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("round");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo-content");
    actions.classList.add("actions");
    editbtn.classList.add("edit");
    deletebtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    editbtn.innerHTML = "Edit";
    deletebtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);

    actions.appendChild(editbtn);
    actions.appendChild(deletebtn);

    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
    });

    editbtn.addEventListener("click", (e) => {
      const input = content.querySelector("input");

      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
      });

      deletebtn.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });
  });
}
