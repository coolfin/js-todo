const container = document.getElementById('todo-main');

window.onload = function () {
  const todoList = JSON.parse(window.localStorage.getItem('todo'));

  if (todoList) {
    todoSort(todoList);

    for (let i = 0; i < todoList.length; i++) {
      container.innerHTML += `
        <div class="todo-item">
          <div class="todo-item-text">${todoList[i].todo}</div>
          <div class="todo-item-importance">${
            todoList[i].importance === '1'
              ? '낮음'
              : todoList[i].importance === '2'
              ? '보통'
              : '높음'
              ? todoList[i].importance === '0'
              : '완료'
          }</div>
          <div class="todo-item-date">${todoList[i].date}</div>
          <div class="todo-item-control">
            <div class="todo-done">완료</div>
            <div class="todo-delete">삭제</div>
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
};

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
