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
    }
];

//PROMISES WITH RESOLVE AND REJECT
/*let getEmployees = (id) => {
    return new Promise((resolve, reject) => {
        let employeeDB = employees.find(employee => employee.id === id);
        setTimeout(() => {
            employeeDB ? 
            resolve(employeeDB) :
            reject(`The user with id ${id} doesn't exist`);
        }, 3000);
    })
}*/

/*let getSalary = (employee) => {
    return new Promise((resolve, reject) => {
        let salaryDB = salaries.find(salary => salary.id === employee.id);
        salaryDB ? 
            resolve({name: employee.name, salary: salaryDB.salary}) :
            reject(`No salary was found for the user with id ${employee.id}`)
    })
}*/

//NORMAL PROMISES
/*getEmployees(10).then(
    resp => {
        getSalary(resp).then(
            obj => console.log(`The salary of ${obj.name} is ${obj.salary}$`),
            err => console.error(err)
        )
    },
    err => console.error(err)
);*/

//PROMISES IN STRING
/*getEmployees(1).then(employee => {
    return getSalary(employee);
})
.then(obj => console.log(`The salaryy of ${obj.name} is ${obj.salary}$`))
.catch(err => console.error(err));*/

//ASYNC AWAIT
let timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let getEmployees = async (id) => {
    let employeeDB = employees.find(employee => employee.id === id);
    await timeout(3000);
    if (!employeeDB) {
        throw new Error(`The user with id ${id} doesn't exist`); 
    }
    return employeeDB;
}

let getSalary = async (employee) => {
    let salaryDB = salaries.find(salary => salary.id === employee.id);
    await timeout(3000);
    if (!salaryDB) {
        throw new Error(`No salary was found for the user with id ${employee.id}`);
    }
    return {name: employee.name, salary: salaryDB.salary};
}

let showInfo = async () => {
    await timeout(3000);
    let promise1 = await getEmployees(2);
    let promise2 = await getSalary(promise1);
    return `The salary of ${promise2.name} is ${promise2.salary}$`;
}

showInfo().then(
    resp => console.log(resp),
    err => console.log(err)
);