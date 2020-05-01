function x(p: string) {
    return "hello " + p;
}

let p = "liu";

console.log(x(p));
console.log(x(p, 9));
p = 5;
console.log(x(p));

//类型注解，类型报错，参数个数报错！但是编辑依然成功！！
//定位为数据的检查器，语法的检查器！


interface Person {
    firName: string,
    lasName: string
}

const y = (p: Person): string => {
    return "hello " + p.firName + " " + p.lasName;
};

console.log(y({firName: "liu", lasName: "wy"}));

class User {
    fullName: string;
    firstName: string;
    lastName: string;

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
}

let user = new User("liu", "wy");

//类型注解，好处就是机械地低级的单元测试的感觉！


//布尔

let a: boolean = 3;

//number

let b: number = 20;  //十进制
b = 0x14;   //16进制 ， 4代表4，1代表16
b = 0b10100;  //二进制
b = 0o24;  //八进制 ， 4+2*8

//string

let str: string = "liuliu";
str = `${str}` + str;

//array

let arr :number[]=[]

let arr1:Array<number> = [35,'d']

//元组

let arr2:[string,number]
arr2 = ['e',5]
arr2[0].substr(0)
arr2 = [5,9]
arr2[0].substr(0)
//如何判断数据的语法对错？它不找数据，它找定义那里！
arr2[1].substr(0)
//只要报错，肯定是数据有问题！

arr2[2] = 9  //长度定死了！扩展就报错！

arr2[0] = true //不是上面的指定过的几种类型，都报错！



