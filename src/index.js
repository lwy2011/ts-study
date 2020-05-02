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
//类型注解，好处就是机械地低级的单元测试的感觉！
//布尔
var a = 3;
//number
var b = 20; //十进制
b = 0x14; //16进制 ， 4代表4，1代表16
b = 20; //二进制
b = 20; //八进制 ， 4+2*8
//string
var str = "liuliu";
str = "" + str + str;
//array
var arr = [];
var arr1 = [35, "d"];
//元组
var arr2;
arr2 = ["e", 5];
arr2[0].substr(0);
arr2 = [5, 9];
arr2[0].substr(0);
//如何判断数据的语法对错？它不找数据，它找定义那里！
arr2[1].substr(0);
//只要报错，肯定是数据有问题！
arr2[2] = 9; //长度定死了！扩展就报错！
arr2[0] = true; //不是上面的指定过的几种类型，都报错！
//枚举
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 0] = "Red";
    Colors[Colors["Green"] = 1] = "Green";
    Colors[Colors["Blue"] = 2] = "Blue";
})(Colors || (Colors = {}));
var c = Colors[2];
console.log(c);
//精髓就是枚举其实就是类似字典，只不过加了反向赋值，key-value互相交换了：
// var Colors;
// (function (Colors) {
//     Colors[Colors["Red"] = 0] = "Red";
//     Colors[Colors["Green"] = 1] = "Green";
//     Colors[Colors["Blue"] = 2] = "Blue";
// })(Colors || (Colors = {}));
Colors[3] = "block";
Colors["Block"] = 4;
Colors[Colors[4] = "Block"] = 4;
//直接赋值只能赋值给key，value作为key赋值，被禁止！
//any : 随意的，尽量不要用，否则就丢失了优势了：
var d = 4;
d = false; //上面会推断d为number值
var d1 = 4;
d1 = false; //不会报错了，阻止默认的推断了！
//如果一堆各种类型的节点的数组或者对象，其实可以用any:
var arr3 = [3, 5, "ew", true];
arr3.push([89, 0]);
arr3[0] = "0";
// void 不返回任何值,特意声明它没意义的
var x1 = function () {
};
//只能赋值undefined || null
var x2 = undefined || null;
//null undefined
//定义为这两没有意义，是所有类型的子类型，可以赋值给所有类型为null,undefined:
var n = 5;
n = null; //不报错，但是ts编译时，添加strictNullChecks,就会报错！
n = undefined;
var n1 = 5; //这样保险！
{
    //never :不存在的值，函数抛出异常时用，所有的类型的子类型，没有其他类型是它的子类型！
    //使用场景
    var err = function (msg) {
        throw new Error(msg);
    };
    var htmlMiniteLoop = function () {
        while (true) {
        }
    };
}
{
    create({ a: 0 });
    create(null);
}
