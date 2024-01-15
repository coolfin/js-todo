const btn = document.getElementById('todo-btn')
let todo = document.getElementById('todo')

btn.addEventListener('click', function() {
  alert(todo.value)
})

todo.addEventListener('keydown', function(e) {
  if (e.key === 'enter') {
    alert(todo.value)
  }
})