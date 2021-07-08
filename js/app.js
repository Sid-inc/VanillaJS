let addBtn = document.getElementsByClassName('create-todo__add')[0];
let textAdd = document.getElementsByClassName('create-todo__text')[0];
let holderAdd = document.getElementsByClassName('create-todo__holder')[0];
let inputAdd = document.getElementsByClassName('create-todo__input')[0];
let createTodoAction = document.getElementById('create-todo');
let todoContainer = document.getElementsByClassName('todo-list__inner')[0];
let todoCount = 0;

const todoStorage = { //Работа с local storage
  emptyListCheck() {
    let todoItemsList = localStorage.getItem('todoItemsList');
    if (todoItemsList) return true;
  },

  addRecord(id, text, state) { //Добавление записи в local storage
    record = {
      id,
      text,
      state,
    } 
    let storageItemsList = JSON.parse(localStorage.getItem("todoItemsList") || "[]");
    storageItemsList.push(record);
    localStorage.setItem("todoItemsList", JSON.stringify(storageItemsList));
  },

  changeState(id) {

  },
}

function templateListItem(itemId, itemText) { //Заполнение шаблона для вывода TODO
    let template = document.getElementById('todo-item');
    let itemIdSet = template.content.querySelectorAll('.list-item')[0];
    let itemMarkSet = template.content.querySelectorAll('.list-item__mark')[0];
    let itemImgSet = template.content.querySelectorAll('.list-item__img')[0];
    let itemTextSet = template.content.querySelectorAll('.list-item__text')[0];

    itemIdSet.id = 'todo-item-' + itemId;
    itemMarkSet.id = 'todo-mark' + itemId;
    itemImgSet.setAttribute('for', 'todo-mark' + itemId);
    itemTextSet.innerHTML = itemText;

    return document.importNode(template.content, true);
}

function renderTodo(todoItem) { //Вывод TODO в список
  todoContainer.appendChild(todoItem);
}

function switchInputState() { //Переключение между плюсом и полем ввода
  holderAdd.classList.toggle('create-todo__holder--show');
  inputAdd.classList.toggle('create-todo__input--show');
}

function todoValidation() { //Проверка на пустое значение
  let newTodoText = createTodoAction.getElementsByClassName('create-todo__text')[0];
  if (newTodoText && newTodoText.value !== '') return true;
  return false;
}

function todoChangeState(todoMark) {
  console.log(todoMark);
  //Получаем цифру id у родителя элемента
  todoStorage.changeState(id);
}

window.addEventListener("change", (event) => {
  if (event.target.classList.contains('list-item__mark')) todoChangeState(event.target);
});

addBtn.addEventListener('click', () => { //Клик по нопке с плюсом
  switchInputState();
  textAdd.focus();
});

createTodoAction.addEventListener('submit', (event) => { //Клик по нопке добавить TODO
  event.preventDefault();
  if (!todoValidation()) return;
  createTodo();
});

function createTodo() { //Создание TODO
  let todoText = createTodoAction.getElementsByClassName('create-todo__text')[0].value;
  let todo = {
    id: ++todoCount,
    text: todoText,
  }
  renderTodo(templateListItem(todo.id, todo.text));
  todoStorage.addRecord(todo.id, todo.text, 'inProgress');
  switchInputState();
  createTodoAction.getElementsByClassName('create-todo__text')[0].value = '';
}
