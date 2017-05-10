class Person {
    constructor (name) {
        this.name = name;
    }

    hello () {
        if (typeof this.name === 'string') {
            return 'Hellosss, I am ' + this.name;
        }
        else {
            return 'Hello'
    }
    }

}

var person = new Person('Ihsan ');

document.write(person.hello());