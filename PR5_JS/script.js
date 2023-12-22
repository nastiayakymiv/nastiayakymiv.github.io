document.addEventListener('DOMContentLoaded', function () {
    loadTodoItems();
});

function addTodo() {
    var todoText = document.getElementById('newTodo').value;
    if (todoText.trim() === '') {
        alert('Please enter a valid ToDo');
        return;
    }

    var todoList = document.getElementById('todoList');
    var listItem = document.createElement('li');
    listItem.className = 'todo-item';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        toggleTodoCompleted(listItem);
    });
    listItem.appendChild(checkbox);

    var textSpan = document.createElement('span');
    textSpan.innerText = todoText + ' - ' + getFormattedDateTime();
    listItem.appendChild(textSpan);

    var deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete-icon';
    deleteIcon.innerHTML = '&#10006;';
    deleteIcon.addEventListener('click', function () {
        deleteTodoItem(listItem);
    });
    listItem.appendChild(deleteIcon);

    var editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todoText;
    editInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            saveEditedTodoItem(listItem, editInput.value);
        }
    });
    listItem.appendChild(editInput);

    todoList.appendChild(listItem);
    saveTodoItems();

    document.getElementById('newTodo').value = '';
}

function addTodoOnEnter(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function getFormattedDateTime() {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1; 
    var year = now.getFullYear() % 100; 
    var hours = now.getHours();
    var minutes = now.getMinutes();

    return padNumber(day) + '.' + padNumber(month) + '.' + padNumber(year) + ', ' + padNumber(hours) + ':' + padNumber(minutes);
}

function padNumber(number) {
    return number < 10 ? '0' + number : number;
}

function toggleTodoCompleted(listItem) {
    listItem.classList.toggle('completed');
    saveTodoItems();
}

function deleteTodoItem(listItem) {
    listItem.remove();
    saveTodoItems();
}

function saveEditedTodoItem(listItem, newText) {
    var textSpan = listItem.querySelector('span');
    textSpan.innerText = newText + ' - ' + getFormattedDateTime();

    var editInput = listItem.querySelector('input[type="text"]');
    editInput.style.display = 'none';

    saveTodoItems();
}

function editTodoItem(listItem) {
    var textSpan = listItem.querySelector('span');
    var editInput = listItem.querySelector('input[type="text"]');
    
    textSpan.style.display = 'none';
    editInput.style.display = 'block';
    editInput.focus();
    editInput.select();
}

document.getElementById('todoList').addEventListener('dblclick', function (event) {
    var listItem = event.target.closest('.todo-item');
    if (listItem) {
        editTodoItem(listItem);
    }
});

function sortTodos(filter) {
    var todoList = document.getElementById('todoList');
    var todoItems = Array.from(todoList.children);

    switch (filter) {
        case 'all':
            todoItems.forEach(function (item) {
                item.style.display = 'flex';
            });
            break;
        case 'active':
            todoItems.forEach(function (item) {
                if (item.classList.contains('completed')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
            });
            break;
        case 'completed':
            todoItems.forEach(function (item) {
                if (item.classList.contains('completed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            break;
    }
}

function saveTodoItems() {
    var todoList = document.getElementById('todoList');
    var todoItems = [];

    for (var i = 0; i < todoList.children.length; i++) {
        var listItem = todoList.children[i];
        var todoText = listItem.querySelector('span').innerText;
        var isCompleted = listItem.classList.contains('completed');

        todoItems.push({ text: todoText, completed: isCompleted });
    }

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function loadTodoItems() {
    var todoList = document.getElementById('todoList');
    var storedTodoItems = localStorage.getItem('todoItems');

    if (storedTodoItems) {
        var todoItems = JSON.parse(storedTodoItems);

        todoItems.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.className = 'todo-item';

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function () {
                toggleTodoCompleted(listItem);
            });
            listItem.appendChild(checkbox);

            var textSpan = document.createElement('span');
            textSpan.innerText = item.text;
            listItem.appendChild(textSpan);

            if (item.completed) {
                listItem.classList.add('completed');
            }

            var deleteIcon = document.createElement('span');
            deleteIcon.className = 'delete-icon';
            deleteIcon.innerHTML = '&#10006;';
            deleteIcon.addEventListener('click', function () {
                deleteTodoItem(listItem);
            });
            listItem.appendChild(deleteIcon);

            var editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = item.text;
            editInput.addEventListener('keyup', function (event) {
                if (event.key === 'Enter') {
                    saveEditedTodoItem(listItem, editInput.value);
                }
            });
            listItem.appendChild(editInput);

            todoList.appendChild(listItem);
        });
    }
}