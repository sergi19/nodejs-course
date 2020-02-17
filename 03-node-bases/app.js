//requireds types
//const fs = require('fs');//node.js libraries
//const fs = require('express');//libraries from another people
//const fs = require('./fs');//project files
/*let base = 3;
let data = '';

for (let i = 1; i <= 10; i++) {
    data += `${base} * ${i} = ${base * i}\n`;
}

fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
    if (err) throw err;

    console.log('The file has been created');
});*/

const argv = require('./config/yargs').argv;
const colors = require('colors/safe');

const {createFile, listTable} = require('./multiply/multiply');

let command = argv._[0];

switch(command) {
    case 'create':
        createFile(argv.base, argv.limit)
            .then(resp => console.log(`file created: `, colors.gray(resp)))
            .catch(err => console.log(err));
        break;
    case 'list':
        listTable(argv.base, argv.limit);
        break;
    default:
        console.log('Not founded command');
}





