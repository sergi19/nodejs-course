//setTimeout(() => {
//    console.log('Hello World');
//}, 3000);

let getUserById = (id, callback) => {
    let user = {
        name: 'Sergio',
        id
    }

    if (id == 20) {
        console.error(`The user with id ${id} doesn't exist in DB`);
    } else {
        callback(null, user);
    }    
}


getUserById(10, (error, user) => {

    if (error) {
        return console.error(error);
    }

    console.log('User from DB', user);
})