let addBtn = document.getElementsByClassName('create-todo__add')[0];
let textAdd = document.getElementsByClassName('create-todo__text')[0];
let holderAdd = document.getElementsByClassName('create-todo__holder')[0];
let inputAdd = document.getElementsByClassName('create-todo__input')[0];

addBtn.addEventListener('click', () => {
  holderAdd.classList.toggle('create-todo__holder--show');
  inputAdd.classList.toggle('create-todo__input--show');
  textAdd.focus();
});

textAdd.addEventListener('blur', () => {
  holderAdd.classList.toggle('create-todo__holder--show');
  inputAdd.classList.toggle('create-todo__input--show');
});