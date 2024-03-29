const btn = document.getElementById('todo-btn');
const select = document.getElementById('todo-select');
let todo = document.getElementById('todo');

function addTodo(text, selected) {
  let arr = JSON.parse(window.localStorage.getItem('todo')) || [];

  if (todo.value.trim() !== '') {
    let d = {
      todo: text,
      importance: selected,
      done: false,
      date: new Date().toLocaleString(),
    };
    arr.push(d);
    window.localStorage.setItem('todo', JSON.stringify(arr));

    alert('할 일이 추가되었습니다.');

    todo.value = '';
    select.value = 1;
  } else {
    alert('할 일을 입력해 주세요.');
  }
}

btn.addEventListener('click', function () {
  addTodo(todo.value, select.children[select.selectedIndex].value);
});

todo.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTodo(todo.value, select.children[select.selectedIndex].value);
  }
});
