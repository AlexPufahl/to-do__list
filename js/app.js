// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', todoButtons);
filterOption.addEventListener('click', filterTodo)

//Function

function addTodo(Event) {
    //Prevent form from submitting
    Event.preventDefault()
    //To-do 'div'
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)
    //Add to localStorage
    saveLocalTodos(todoInput.value);
    //Completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<img src="assets/check.svg" alt="Trash icon">';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<img src="assets/trash.svg" alt="Trash icon">';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to the list
    todoList.appendChild(todoDiv);
    //Clear TO-DO input value
    todoInput.value = '';
}

function todoButtons (Event) {
    const item = Event.target;
    //Delete TO-DO item from list
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo)
        //Delete
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }
    //Check marked TO-DO item
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(Event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (Event.target.value) {
            case 'all':
                todo.style.display = "flex";
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';                    
                }else{
                    todo.style.display = 'none';
                }
                break;        
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;    
        }
    })
}

function saveLocalTodos(todo) {
    //Check of localStorage
    let todoToSave;
    if(localStorage.getItem('todo') === null) {
        todoToSave = [];
    }else{
        todoToSave = JSON.parse(localStorage.getItem('todo'))
    }
    todoToSave.push(todo);
    localStorage.setItem('todo', JSON.stringify(todoToSave));        
    
}

function getTodos() {
    let todoToSave;
    if(localStorage.getItem('todo') === null) {
        todoToSave = [];
    }else{
        todoToSave = JSON.parse(localStorage.getItem('todo'))
    };
    todoToSave.forEach(function(todoToSave){
        //To-do 'div'
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todoToSave;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo)
        //Completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<img src="assets/check.svg" alt="Trash icon">';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<img src="assets/trash.svg" alt="Trash icon">';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to the list
        todoList.appendChild(todoDiv);
    }
    );
}

function removeLocalTodos(todo) {
    let todoToSave;
    if(localStorage.getItem('todo') === null) {
        todoToSave = [];
    }else{
        todoToSave = JSON.parse(localStorage.getItem('todo'))
    };
    const todoIndex = todo.children[0].innerText;
    todoToSave.splice(todoToSave.indexOf(todoIndex), 1);
    localStorage.setItem('todo', JSON.stringify(todoToSave))
}
