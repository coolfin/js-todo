const container = document.getElementById('todo-main');
const todoList = JSON.parse(window.localStorage.getItem('todo'));

function loadData(filter) {
  if (todoList) {
    todoSort(todoList);
    container.innerHTML = '';
    for (let i = 0; i < todoList.length; i++) {
      if (filter === 'all') {
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
      } else {
        if (todoList[i].importance[0] === filter) {
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
      }
    }
  } else {
    const header = document.getElementById('todo-header');
    const main = document.getElementById('todo-main');
    header.style.display = 'none';
    main.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', loadData('all'));

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

function handleChangeCategory(e) {
  const target = e.target;

  if (target.classList.contains('active')) return;
  else {
    const active = document.getElementsByClassName('active');
    active[0].className = active[0].className.replace('active', '');
    target.className += ' active';
  }

  if (target.classList.contains('todo-header-item')) {
    const cate = target.getAttribute('data-category');
    loadData(cate);
  }
}

function tip() {
  alert(
    '✔완료 버튼을 누르면 맨 아래로 내려가며, \n❌취소 버튼을 누르면 원래 위치로 돌아옵니다.'
  );
}
