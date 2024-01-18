const container = document.getElementById('wrapper');

window.onload = function () {
  const todoList = JSON.parse(window.localStorage.getItem('todo'));

  if (todoList) {
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
          }</div>
          <div class="todo-item-date">${todoList[i].date}</div>
          <div>
            <div class="todo-done">V</div>
            <div class="todo-remove">X</div>
          </div>
        </div>
      `;
    }
  } else {
    const header = document.getElementById('todo-header');
    header.style.display = 'none';
  }
};
