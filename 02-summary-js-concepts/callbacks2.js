let employees = [
    {
        id: 1,
        name: 'Sergio'
    },
    {
        id: 2,
        name: 'Luisa'
    },
    {
        id: 3,
        name: 'Juan'
    }
];

let salaries = [
    {
        id: 1,
        salary: 2000
    },
    {
        id: 2,
        salary: 3000
    },
    {
        id: 3,
        salary: 1500
    },
];

let getEmployeeById = (id, callback) => {
    let employeeDB = employees.find(employee => employee.id === id);
    if (!employeeDB) {
        callback(`The user with id ${id} doesn't exist`);
    } else {
        callback(null, employeeDB);
    }
}

let getSalary = (employee, callback) => {
    let salaryDB = salaries.find(salary => salary.id === employee.id);
    if (!salaryDB) {
        callback(`No salary was found for the user with id ${employee.id}`);
    } else {
        callback(null, {name: employee.name, salary: salaryDB.salary});
    }
}

getEmployeeById(3, (err, employee) => {
    if (err) {
        return console.log(err)
    }

    getSalary(employee, (err, resp) => {
        if (err) {
            return console.log(err);
        }
        console.log(resp);
    })
});





