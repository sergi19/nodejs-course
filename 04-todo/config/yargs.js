const description = {
        demand: true,
        alias: 'd',
        desc: 'Todo description'
}

const completed = {
    default: true,
    alias: 'c',
    desc: 'Mark the todo as completed or pending'
}

const argv = require('yargs')
    .command('create', 'Create a todo element', {description})
    .command('update', 'Update the todo completed state', {description, completed})
    .command('delete', 'Delete a todo', {description})
    .command('list', 'List all todos')
    .command('filter', 'Filter all todos by state', {completed})
    .help()
    .argv;

module.exports = {
    argv
}