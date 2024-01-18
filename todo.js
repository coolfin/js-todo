const container = document.getElementById('todo-main');
const todoList = JSON.parse(window.localStorage.getItem('todo'));

document.addEventListener('DOMContentLoaded', function () {
  if (todoList) {
    todoSort(todoList);

    for (let i = 0; i < todoList.length; i++) {
      container.innerHTML += `
        <div class="todo-item ${
          todoList[i].importance[0] === '0' ? 'color-done' : ''
        }">
          <div class="todo-item-text">${todoList[i].todo}</div>
          <div class="todo-item-importance">${
            todoList[i].importance === '1'
              ? '낮음'
              : todoList[i].importance === '2'
              ? '보통'
              : todoList[i].importance === '3'
              ? '높음'
              : '완료'
          }</div>
          <div class="todo-item-date">${todoList[i].date}</div>
          <div class="todo-item-control">
            <div class="todo-done ${
              todoList[i].importance[0] === '0' ? 'btn-done' : ''
            }" onclick=onClickDone(${i})>${
        todoList[i].importance[0] === '0' ? '취소' : '완료'
      }</div>
            <div class="todo-delete" onclick="onClickDelete(${i})">삭제</div>
          </div>
        </div>
      `;
    }
  } else {
    const header = document.getElementById('todo-header');
    const main = document.getElementById('todo-main');
    header.style.display = 'none';
    main.style.display = 'none';
  }
});

//a,b 값이 0보다 작은경우 a가 먼저옴
//a,b 값이 0보다 큰경우 b가 먼저옴
//a,b 값이 0인 경우 순서를 바꾸지 않음

//날짜는 최신일수록 중요도는 중요할수록 값이 크다
function todoSort(todoList) {
  todoList.sort((a, b) => {
    if (a.importance === b.importance)
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    else return a.importance < b.importance ? 1 : -1;
  });
}

function onClickDone(index) {
  //이미 완료된 경우 취소
  if (todoList[index].importance[0] === '0')
    todoList[index].importance = todoList[index].importance[1];
  else {
    const todoItem = document.getElementsByClassName('todo-item');
    todoItem[index].className += ' color-done';

    console.log(todoList[index]);

    todoList[index].importance = '0' + todoList[index].importance;
  }

  window.localStorage.setItem('todo', JSON.stringify(todoList));
  location.reload();
}

function onClickDelete(index) {
  let confirm = window.confirm('삭제하시겠습니까?');
  if (confirm) {
    todoList.splice(index, 1);
    window.localStorage.setItem('todo', JSON.stringify(todoList));

    location.reload();
  }
}
