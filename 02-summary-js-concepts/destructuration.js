let deadpool = {
    name: 'Wade',
    lastname: 'Winston',
    power: 'Regeneration',
    getName: function() {
        return `${this.name} ${this.lastname} - power: ${this.power}`
    }
}

//let name = deadpool.name;
//let lastname = deadpool.lastname;
//let power = deadpool.power;

let {name, lastname, power} = deadpool;

console.log(name, lastname, power);