const fs = require('fs');

const getDataDB = () => {
    let todoList = [];
    try {
        todoList = require('../db/db.json');
    } catch(error) {
        todoList = [];
    }
    return todoList;
}

const create = (description) => {
    let todoList = getDataDB();
    let todo = {
        description,
        completed: false
    };
    todoList.push(todo);
    fs.writeFile(`db/db.json`, JSON.stringify(todoList), (err) => {
        if (err) throw new Error('An error has ocurred');
    });
    return todoList;
}

const list = () => {
    let todoList = getDataDB();
    return todoList;
}

const update = (description, completed) => {
    let todoList = getDataDB();
    let item = todoList.find(todo => todo.description === description);
    if (!item) {
        return 'Todo not found';
    }
    item.description = description;
    console.log('what is completed: ', completed);
    item.completed = completed === 'true' || completed === true ? true : false;
    fs.writeFile(`db/db.json`, JSON.stringify(todoList), (err) => {
        if (err) throw new Error('An error has ocurred');
    });
    return item;
}

const deleteTodo = (description) => {
    let todoList = getDataDB();
    let todo = todoList.findIndex(todo => todo.description === description);
    if (todo < 0) {
        return 'Todo not found';
    }
    let newList = todoList.filter(todo => todo.description !== description);
    fs.writeFile(`db/db.json`, JSON.stringify(newList), (err) => {
        if (err) throw new Error('An error has ocurred');
    });
    return newList;    
}

const filterByState = (state) => {
    console.log('what is state: ', state);
    let completed = state === 'true' ? true : false;
    let todoList = getDataDB();
    let filterList = todoList.filter(todo => todo.completed === completed);
    if (filterList.length == 0) return 'Data not found';
    return filterList;
    
}

module.exports = {
    create,
    list,
    update,
    deleteTodo,
    filterByState
}
