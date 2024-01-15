const btn = document.getElementById('todo-btn')
let todo = document.getElementById('todo')
 
function addTodo(text) {
  let arr = JSON.parse(window.localStorage.getItem('todo')) || []
  if(todo.value.trim() !== '') {
    arr.push({
      'todo' : text
    })
    window.localStorage.setItem('todo', JSON.stringify(arr))
    
    todo.value = ''
    alert(text)
  }
}

btn.addEventListener('click', function() {
  addTodo(todo.value)
})

todo.addEventListener('keydown', function(e) {
  if (e.key === 'enter') {
    addTodo(todo.value)
  }
})

// let params = {
//   "id" : id,
//   "importance" : importance,
//   "todo" : todo.value, 
// }
