const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limit: {
        alias: 'l',
        default: 10
    }
}

const argv = require('yargs')
    .command('list', 'Print in console the multiplication table', opts)
    .command('create', 'Generate a file with the multiplication table', opts)
    .help()
    .argv;

module.exports = {
    argv
}