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

  getRecord(name) {
    return JSON.parse(localStorage.getItem(name) || "[]");
  },

  setRecord(name, data) {
    localStorage.setItem(name, JSON.stringify(data))
  },

  addNewRecord(id, text, state) { 
    record = {
      id,
      text,
      state,
    }; 
    let storageItemsList = this.getRecord('todoItemsList');
    storageItemsList.push(record);
    this.setRecord('todoItemsList', storageItemsList);
  },

  removeRecord(id) {
    let storageItemsList = this.getRecord('todoItemsList');
    for (let todo in storageItemsList) {
      if (storageItemsList[todo].id === +id) {
        storageItemsList.splice(todo, 1);
      }
    }
    this.setRecord('todoItemsList', storageItemsList);
  },

  changeState(id) {
    let storageItemsList = this.getRecord('todoItemsList');
    for (let todo in storageItemsList) {
      if (storageItemsList[todo].id === +id) {
        if (storageItemsList[todo].state === 'inProgress') {
          storageItemsList[todo].state = 'finished';
        } else {
          storageItemsList[todo].state = 'inProgress';
        }
        break;
      };
    }
    this.setRecord('todoItemsList', storageItemsList);
  },
};

window.onload = () => { // Вывод имеющихся в local storage todo после загрузки страницы
  if(todoStorage.emptyListCheck()) {
    let currentList = todoStorage.getRecord('todoItemsList');
    todoCount = currentList.length;
    let state = false;
    for (let todo in currentList) {
      (currentList[todo].state === 'finished') ? state = true : state = false;
      renderTodo(templateListItem(currentList[todo].id, currentList[todo].text, state));
    }
  }
}

function templateListItem(itemId, itemText, state) { //Заполнение шаблона для вывода TODO
  let template = document.getElementById('todo-item');
  let itemIdSet = template.content.querySelectorAll('.list-item')[0];
  let itemMarkSet = template.content.querySelectorAll('.list-item__mark')[0];
  let itemImgSet = template.content.querySelectorAll('.list-item__img')[0];
  let itemTextSet = template.content.querySelectorAll('.list-item__text')[0];
  
  itemIdSet.id = 'todo-item-' + itemId;
  itemMarkSet.id = 'todo-mark' + itemId;
  state ? itemMarkSet.checked = true : itemMarkSet.checked = false;
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

function getTodoId(mark) { // Получение ID родительского ли по дочернему элементу
  let fullId = mark.parentNode.id;
  return fullId.replace(/\D+/, '');
}

function todoChangeState(todoMark) { //Меняем статус TODO в local storage
  let todoId = getTodoId(todoMark);
  todoStorage.changeState(todoId);
}

window.addEventListener("change", (event) => { // Поиск изменения состояния галки - выполнено
  if (event.target.classList.contains('list-item__mark')) todoChangeState(event.target);
});

window.addEventListener("click", (event) => { // Поиск клика по кнопке удаления
  if (event.target.classList.contains('list-item__remove')) removeTodo(event.target);
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
  };
  renderTodo(templateListItem(todo.id, todo.text, false));
  todoStorage.addNewRecord(todo.id, todo.text, 'inProgress');
  switchInputState();
  createTodoAction.getElementsByClassName('create-todo__text')[0].value = '';
}

function removeTodo(todoRemove) {
  let todoId = getTodoId(todoRemove);
  todoRemove.parentNode.remove();
  todoStorage.removeRecord(todoId);
}
