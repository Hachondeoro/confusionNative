const add = (x, y) => x + y
const add2 = x => y => x + y
const add3 = function (x) {
    return function (y) {
        return x + y
    }
}
console.log(add(2, 3))
console.log(add2(2)(3))
console.log(add3(2)(3))