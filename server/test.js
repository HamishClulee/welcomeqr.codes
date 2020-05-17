const thing = {
    thingOne: function () {
        return 'hello'
    },
    thingTwo: function (x) {
        console.log(this)
        return x + 10
    }
}

console.log(thing.thingOne())

console.log(thing.thingTwo(5))