function x(p) {
    return "hello " + p;
}
var p = "liu";
console.log(x(p));
console.log(x(p, 9));
p = 5;
console.log(x(p));
var y = function (p) {
    return "hello " + p.firName + " " + p.lasName;
};
console.log(y({ firName: "liu", lasName: "wy" }));
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
    return User;
}());
var user = new User("liu", "wy");
