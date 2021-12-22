const clear = document.querySelector(".fa-refresh");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const form = document.querySelector("form");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THRU = "lineThru";

const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

let LIST, id;
//restore local array
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    loadToDo(LIST);
    id = LIST.length;
} else {
    LIST = [];
    id = 0;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const toDo = input.value;
    if (toDo == null || toDo === "") return;
    if (toDo) {
        addToDo(toDo, id, false, false);

        LIST.push({ name: toDo, id: id, done: false, trash: false });

        id++;
        input.value = "";
    }
});

list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    console.log(elementJob);
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

function loadToDo(arr) {
    arr.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

function addToDo(toDo, id, done, trash) {
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THRU : "";

    const position = "beforeend";
    const item = `
  <li class="item">
  <i class="far ${DONE}" id="${id}" job="complete"></i>
  <p class="text ${LINE}">${toDo}</p>
  <i class="far fa-trash-alt" id="${id}" job="delete"></i>
  </li>
  `;

    list.insertAdjacentHTML(position, item);

    if (trash) {
        return;
    }
}
addToDo(toDo);

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THRU);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
