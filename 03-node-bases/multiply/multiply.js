const fs = require('fs');
const colors = require('colors/safe');

let listTable = (base, limit) => {

    console.log(colors.green(`table of ${base}`));

    for (let i = 1; i <= limit; i++) {
        console.log(`${base} * ${i} = ${base * i}`);
    }
}

let createFile = (base, limit = 10) => {
    return new Promise((resolve, reject) => {

        if (isNaN(base)) {
            reject('The value entered is not a number');
            return;
        }

        let data = '';
        for (let i = 1; i <= limit; i++) {
            data += `${base} * ${i} = ${base * i}\n`;
        }

        fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
            if (err) reject(err)
            else resolve(`table-${base}.txt`)
        });
    })
}

module.exports = {
    createFile,
    listTable
}