const argv = require('./config/yargs').argv;
const todo = require('./todo/todo');
const colors = require('colors');
let command = argv._[0];

switch (command) {
    case 'create':
        let create = todo.create(argv.description);
        console.log(create);
        break;
    case 'list':
        let list = todo.list();
        for (let todo of list) {
            console.log(colors.green('===========TODO==========='));
            console.log('Description: ', todo.description);
            console.log('Completed: ', todo.completed);
            console.log(colors.green('=========================='));
        }
        break;
    case 'update':
        let item = todo.update(argv.description, argv.completed);
        console.log(item);
        break;
    case 'delete':
        let newList = todo.deleteTodo(argv.description);
        console.log(newList);
    case 'filter':
        let filterList = todo.filterByState(argv.completed);
        console.log(filterList);
        break;
    default:
        console.log('Command not found');
        break;
}