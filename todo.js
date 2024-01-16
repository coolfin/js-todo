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
        </div>
      `;
    }
  }
};
