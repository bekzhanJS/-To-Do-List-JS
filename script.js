let input = document.getElementById("input");
let btn = document.getElementById("button");
const todo_list = document.getElementById("todo_list");

// add Task
btn.onclick = function () {
  if (input.value === "") {
    alert("You should type something");
  } else {
    todo_list.insertAdjacentHTML("beforeend", getTemplate(input.value));
    return (input.value = "");
  }
};

function getTemplate(title) {
  return `
  <div class="todo_list_wrapper">
          <div class="todo_list_value">
            <input class="todo_list_check" type="radio" />
            <div class="input_value">${title}</div>
          </div>
          <div class="todo_list_btns">
            <button class="todo_list_edit">Edit</button>
            <button class="todo_list_delete">Delete</button>
          </div>
        </div>
  `;
}
