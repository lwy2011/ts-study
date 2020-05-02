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

let arr: number[] = [];

let arr1: Array<number> = [35, "d"];

//元组

let arr2: [string, number];
arr2 = ["e", 5];
arr2[0].substr(0);
arr2 = [5, 9];
arr2[0].substr(0);
//如何判断数据的语法对错？它不找数据，它找定义那里！
arr2[1].substr(0);
//只要报错，肯定是数据有问题！

arr2[2] = 9;  //长度定死了！扩展就报错！

arr2[0] = true; //不是上面的指定过的几种类型，都报错！

//枚举
enum Colors {
    Red,
    Green,
    Blue
}

let c: string = Colors[2];
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

let d = 4;
d = false;   //上面会推断d为number值

let d1: any = 4;
d1 = false;    //不会报错了，阻止默认的推断了！

//如果一堆各种类型的节点的数组或者对象，其实可以用any:

let arr3: any[] = [3, 5, "ew", true];
arr3.push([89, 0]);
arr3[0] = "0";

// void 不返回任何值,特意声明它没意义的

const x1 = (): void => {

};
//只能赋值undefined || null
let x2: void = undefined || null;


//null undefined

//定义为这两没有意义，是所有类型的子类型，可以赋值给所有类型为null,undefined:
let n: number = 5;
n = null;   //不报错，但是ts编译时，添加strictNullChecks,就会报错！
n = undefined;
let n1: number | null = 5;  //这样保险！

{
    //never :不存在的值，函数抛出异常时用，所有的类型的子类型，没有其他类型是它的子类型！
    //使用场景
    const err = (msg: string): never => {
        throw new Error(msg);
    };
    const htmlMiniteLoop = (): never => {
        while (true) {

        }
    };
}

{
    //object
    declare function create(o: object | null): void;

    create({a: 0});
    create(null);
}
{
    //类型推断
    let v: any = "ssdfsd";
    console.log(v.length);  //编译器识别不了！
    let length: number = (<string>v).length;  //编译器识别为string，可以自动匹配length属性
    let l: number = (v as string).length;
}

//tsc.js搜索报错信息，可以追述源码！！

{
    // var: 不要用，副作用太大，不可控！
    const x = () => {
        var a = 10;
        return function b() {
            var b = a + 1;
            return b;
        };
    };
    var b1 = x()();

    // function f(case) {
    //     if (case){
    //       var x = 0
    //     }
    // }
    // f()
    // f(8)
    // for (var i=0;i<arr.length;i++){
    //     const val = arr[i]
    //     for (var i=0;i<arr[i].length;i++){
    //         ...错了
    //     }
    // }
    // for (var i=0;i<10;i++){
    //     setTimeout(()=>{
    //         console.log(i);})
    // }
}
{
    //let块级作用域，死区，不可前置,不可重复声明！const是对let的增强，常量声明！
    //能用const 用const,对阅读友好！
    //解构，
    const x = ([a, b]: [number, string]) => {
        console.log(a, b);
    };
    x([5, "d"]);
    //数组与元组是要区分的，ts会不认为是一个类型！
    // let [a,b,...rest] = [4,45,678,78,98,90]
    let [, , c] = [45, 65, 6, 7, 4,];
    let o = {
        a: 2, b: 7
    };
    let {a, b}: { a: number, b: number } = o;
    const y = (o: { a: number, b?: string }) => {
        const {a, b = "d"} = o;  //默认值
    };
    type C = { a: string, b?: number }

    //默认值：
    function m({a, b = 0} = {a: "l"}): void {

    }

    m();
    m({});  //报错！ 这时候合并的是 {a,b=0} 和{},a没值！
}

{
    //接口：
    interface Label {
        label: string
    }

    let a: Label;
    a = {x: 0, label: "d"};
    let b = {x: 0, label: "d"};
    const x = (a: Label) => {

    };
    x(b);  //不做类型注解，就会不全等于，有label就可，做了类型注解，就要完全一致！！

    //可选属性：
    interface Square {
        color: string,
        area: number
    }

    interface Cases {
        color?: string,
        width?: number
    }

    const getSquare = (o: Cases): Square => {
        const init = {
            color: "red", width: 100
        };
        o = {...o, ...init};
        return {
            color: o.color, area: o.width * o.width
        };
    };

    //只读：
    interface Msg {
        readonly x:number
    }
    let v:Msg ={x:6}
    v.x =0

    let arr3 :number[] = [4,6,7]
    let ro:ReadonlyArray<number> = arr3
    ro[1] =8
    arr3[1] = 8
    (ro as number[])[1] =8
    //不变的属性常量的时候用！


}



