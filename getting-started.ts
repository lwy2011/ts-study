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

  constructor(firstName: string, lastName: string) {
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
let x2: undefined = void


//null undefined

//定义为这两没有意义，是所有类型的子类型，可以赋值给所有类型为null,undefined:
  let;
n: number = 5;
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
    width?: number,
    // [key:string]:any   //可索引类型
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

  getSquare({colord: "df", width: 8});
  //这里要么就 {...} as Cases,要么就用可索引类型！！
  //可以用 let o = {colord:...}，然后把o传给函数，利用o没声明类型，但是失去了ts的精髓了！


  //只读：
  interface Msg {
    readonly x: number
  }

  let v: Msg = {x: 6};
  v.x = 0;

  let arr3: number[] = [4, 6, 7];
  let ro: ReadonlyArray<number> = arr3;
  ro[1] = 8;
  arr3[1] = 8
  (ro as number[])[1] = 8;
  //不变的属性常量的时候用！

}
{
  // function
  interface SearchFn {
    (source: string, substring: string): boolean
  }

  // 参数,返回值的类型检测！
}

{
  //索引
  interface Arr {
    [index: number]: string  //索引！
    // 值可以 是number|string,其实就是key,key在js的对象中其实就是string
  }

  //但是同时出现key值设为number|string 的时候，就要看赋值的操作了！
  //因为这种类型的数据实体，key为number的实际转化的时候key就是string类型的：
  class Animal {
  }

  class Dog extends Animal {
  }

  interface O {
    [k: number]: Animal,  //k是number，赋值时会转为string,倒时候检测会检测，
    // number类的key 赋值原本符合Animal的，但是ts认为是string的k，结果应该是Dog类的！
    [k: string]: Dog
  }

  //这里的意思就是，我们的string类的索引的类型，要是number索引的类型的父级！
  interface W {
    [k: string]: number,

    length: number,
    name: string    //会报错！因为跟 [k:string]:number冲突了！
    //这里可以看出来，索引类型，使得同级的其他的k的值都得是它的父级类型！否则报错！
  }

  //readonly:
  interface Ro {
    readonly [k: string]: number
  }

  const arr4: Ro = {x: 7};
  arr4.x = 8;
  arr4.y = 0;

}

{
  // class，静态，实例，static的那里！
  // 静态部分不会做检查的！只检查实例部分！
  interface ClockInterface {  //实例接口
    current: Date

    setTime(t: Date)
  }

  interface ClockConstructore {  //构造器接口
    new(h: number, m: number): ClockInterface
  }

  class Clock implements ClockInterface {
    current: Date;   //实例
    constructor(h: number, m: number) {  //私有静态，ts不会做检查的

    }

    setTime(t: Date) {   //实例；
      this.current = t;
    }
  }

  //区分开实例接口和构造器接口：
  function createClock(constructor: ClockConstructore, h: number, m: number): ClockInterface {
    return new constructor(h, m);
  }

  class AnalogClock implements ClockInterface {  //这本身就是个构造器：
    constructor(h: number, m: number) {
    }

    setTime(t: Date) {
    }

    get current() {
      return new Date();
    }
  }

  let analog = createClock(AnalogClock, 12, 4); //构造实例了！
}

{
  //继承接口：
  interface Shap {
    color: string
  }

  interface PenStroke {
    penWidth: number
  }

  interface Squry extends Shap, PenStroke {  //继承多个接口
    sideLength: number
  }

  let squry = {} as Squry;
  squry.color = "d";
  squry.penWidth = 9;
}
{
  //混合类型
  interface Counter {
    (v: number): string

    interval: number

    reset(): void
  }

  const counter = (v: number): Counter => {
    const fn = ((v) => {
    }) as Counter;
    fn.interval = 50;
    fn.reset = () => {
    };
    return fn;
  };
}
{
  //接口继承类：
  class Control {   //父类，
    private state: any;   //私有
  }

  interface SelectableControl extends Control {  //接口继承了类：
    select()
  }

  class Button extends Control implements SelectableControl { //子类可以实现接口
    select() {
    }
  }

  class CheckBox extends Control {  //单纯地继承类来模拟接口继承类
    select() {
    }
  }

  class A implements SelectableControl {  //不能实现了，因为这个接口有Control的私有属性！！
    select() {
    }
  }

  //接口继承类，这个接口其实就是这个类的子类！！！
}
{
  //class 类
  class Greeter {
    greeting: string;  //这里需要注意一下！

    constructor(msg: string) {
      this.greeting = msg;
    }

    greet() {
      return "hello! " + this.greeting;
    }
  }

  let greet = new Greeter("liuliu");
  greet.greet();

  //继承：
  class Animal {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    move(distance: number) {
      console.log(`${this.name} moved ${distance}m`);
    }
  }

  class Snake extends Animal {
    constructor(name: string) {
      super(name);   //父类的继承的那一步！
    }

    move(distance: number = 5) {
      console.log("moving");
      super.move(distance);  //调用了父类的方法！
    }
  }

  let tom = new Snake("tom");
  tom.move();
}
{
  //公共私有受保护readonly:
  //private:
  class Animal {
    private name: string;

    constructor(name) {
      this.name = name;
    }

    move(distance: number) {
    }
  }

  new Animal("xxx").name;   //error
  class Rhino extends Animal {
    constructor() {
      super("rhino");
    }
  }

  class Employee {
    private name: string;

    constructor(name: string) {
      this.name = name;
    }

    move(distance: number) {
    }
  }

  let animal = new Animal("h");
  let rhino = new Rhino();
  let employee = new Employee("ee");
  rhino = animal;   //类型推断，派生类当然是基类
  rhino = employee;   //类型推断，私有属性不是同源，不是源于animal！！

  //protected:
  class Person {
    protected name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  class Worker extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    talkAbout() {
      return `Hello,my name is ${this.name},and i work in ${this.department}`;
    }
  }

  const worker = new Worker("ll", "sail");
  worker.talkAbout();  //可以内部使用私有，受保护的！
  worker.name;
  worker.department;   //都不能访问，只能类的内部使用！！

  //如果constructor函数也是protected了，那这个类就没法实例化了！编译会报错！

  //readonly : 可访问，不可修改！
  class A {
    readonly name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  const a = new A("a");
  a.name = "";

  //还有简写的形式：
  class B {
    constructor(readonly name: string) {  //这样写简单，但是不容易看懂！
    }
  }
}
{
  //存取器，静态属性：
  //存取器 ： get ,set ，用的是es5的object.defineProperty的get,set。
  let passcode = "xxx";

  class C {
    private _fullName: string;
    get fullName(): string {
      return this._fullName;
    }

    set fullName(name: string) {
      if (passcode && passcode === "xxx") {
        this._fullName = name;
      } else {
        throw new Error("error: unauthorized update of this fullName");
      }
    }
  }

  //静态属性：static!!!跟js的类的静态属性方法没区别！
  //静态属性归根到底，就是构造函数的属性，而不是构造函数的prototype上的属性！！！
  class Grid {
    static start = {x: 0, y: 0};
    scale: number;

    constructor(scale: number) {
      this.scale = scale;
    }

    claculateDistanceToStart(end: { x: number, y: number }): number {
      let Xdist = x - Grid.start.x,
        Ydist = y - Grid.start.y;
      return Math.sqrt(Xdist * Xdist + Ydist * Ydist) * this.scale;
    }
  }
}
{
  //抽象类：abstract
  abstract class Department {   //抽象类不可以实例化！！因为里面有抽象的方法需要补全！
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    printName(): void {
      `department name is ${this.name}`;
    }

    abstract printMeeting(): void    //抽象方法
  }

  class AccountingDepartment extends Department {
    constructor() {
      super("Acounting ");
    }

    printMeeting(): void {    //作为抽象类的子类，必须要把父类的抽象方法补全！
      console.log("printMeeting!!");
    }

    fn() {

    }
  }

  let department: Department;
  department = new Department("ddfd");  //报错！
  department = new AccountingDepartment();   //派生类不报错！
  department.fn();   //报错，因为Department的类没有fn字段！！
}
{
  //高级技巧：
  //typeof XXX类，就拷贝了xxx类的数据成了一个新的数据，当然也是xxx类，
  // 可以干嘛？可以修改这个拷贝的类数据的属性，方法，相当于克隆体了
  class Greeter {
    static defaultGreeting = "hello!";
    greeting: string;

    constructor(msg?: string) {
      this.greeting = msg;
    }

    greet(): string {
      return this.greeting || Greeter.defaultGreeting;
    }
  }

  const greeterCopy: typeof Greeter = Greeter;
  greeterCopy.defaultGreeting = "oh?";
  const greeter1: Greeter = new greeterCopy();
}
{
  //class 作为接口使用：通常不建议如此用！
  class Point {
    x: number;
  ,
    y: number;
  }

  interface Point3d extends Point {
    z: number
  }
}
{
  //函数：
  function add(x: number, y: number): number {
    return x + y;
  }

  const add: (x: number, y: number) => number =
    function (x, y): number {
      return x + y;
    };
  //函数类型，返回值都要写，不能留空！
  //ts可以推断类型的，所以上面的不必都写：
  const add1 = (x: number, y: number): number => x + y,
    add2: (x: number, y: number) => number = (x, y) => x + y;
}
{
  //可选参数，默认参数，数量，类型一一对应！！数量不一致，类型不一致
  // 数量不一致，报错！
  //可选参数 ？ ，必须要放必须参数后面！！
  function fullName(firstN: string, lastN: string): string {
    return firstN + lastN;
  }

  fullName("s");
  fullName("d", "s");
  fullName("d", "s", "s");

  //可选
  function fullName1(firstN: string, lastN?: string): string {
    return firstN + lastN;
  }

  fullName1("d");

  //默认值，带默认值的最好放后面，否则前面的情况，传入还要传undefined！
  function fullName2(firstN: string, lastN: string = "h"): string {
    return firstN + lastN;
  }

  fullName2("d");

  //剩余参数：好用！
  function fullName3(firstN: string, ...restNames: string[]): string {
    return firstN;
  }
}
{
  //this :
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      return function () {
        let card = Math.floor(Math.random() * 52);
        let suit = Math.floor(card / 13);
        return {
          suit: this.suits[suit],
          card: card % 13
        };
      };
    }
  };
  let cardPicker = deck.createCardPicker();
  let picedCard = cardPicker();   //这里会报错！！
  // 因为this.suits[suit]的this,是window了！
  // 改造的话，就是用箭头函数做：
  deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      return () => {
        //这里会把this看成参数，而不是执行的上线文环境，它会保存函数创建时的this值！！！
        let card = Math.floor(Math.random() * 52);
        let suit = Math.floor(card / 13);
        return {
          suit: this.suits[suit],
          card: card % 13
        };
      };
    }
  };

  //ts 中的this,如果不专门指定，标注，默认推断成any类型,编译不会报错的！
  // 提供显示的this参数比较好！是个假的参数，只出现在函数列表最前面：
  function po(this: void) {
  }  //函数中的this是空的，并不是说this是函数的参数！！

  //上面的例子重构一下：
  interface Card {
    suit: string,
    card: number
  }

  interface Deck {
    suits: string[],
    cards: number[],

    createCardPicker(this: Deck): () => Card
  }

  let deck1: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
      return () => {
        let card = Math.floor(Math.random() * 52);
        let suit = Math.floor(card / 13);
        return {
          suit: this.suits[suit],
          card: card % 13
        };
      };
    }
  };

  //this参数在回调函数里面：

  interface UIElement {
    addEventListener(onclick: (this: void, e: Event) => void)

    //点名回调函数中的this是void!!
  }

  class Handler {
    type: string;

    onClickHandler(this: Handler, e: Event) {
      this.type = e.type;
    }
  }

  let h = new Handler();
  let uiElement: UIElement = {
    addEventListener(onclick: (this: void, e: Event) => void) {
    }
  };
  uiElement.addEventListener(h.onClickHandler);
  //这里报错是因为h.onClickHandler的指定的this不是void类型！！

  //可以显式地把this改为void :

  class Handler1 {
    type: string;

    onClickHandler(this: void, e: Event) {
      this.type = e.type;    //但是这里会报错了！！
    }
  }

  //还是用箭头函数靠谱的！！
  class Handler2 {
    type: string;
    onClickHandler = (e: Event) => {
      this.type = e.type;    //但是这里会报错了！！
    };
  }

  //重载：当一个函数的参数很复杂时，情况很多时，可以一种情况一种情况地枚举，写类型：

  function pickCard(x: string[]): string[]
  function pickCard(x: number): number

  function pickCard(x) {
    if (Array.isArray(x)) {
      x.push(1);
      return x;
    } else if (typeof x === "number") {
      return x + 1;
    }
  }

  //x有两种类型！！对这个函数进行重载：意义在于，精确检测参数的类型！
}

{
  //泛型
  //泛型变量：
  function f(arg: any): any {
    return arg;  //这里有隐患，就是arg改变了类型，依旧是any!
  }

  //泛型变量的好处是抽象出来一个代号类型！相当于一个类，
  // 到时候谁用在哪里，赋值这个变量，相当于实例化的实例了
  function f1<T>(arg: T): T {
    return arg;
  }

  let f2 = f1<string>("xxx");
  let f3 = f1("xxx");  //这是默认的类型推断！所以不报错！

  //使用泛型变量的唯一目的，把参数当成所有类型，可以使用自己想要的参数的类型的属性方法！
  function f4<T>(arg: T): T {
    console.log(arg.length);  //T没有length属性！
    return arg;
  }

  // 如何改?
  function f5<T>(arg: T[]): T[] {
    console.log(arg.length);  //T[]有length属性！
    return arg;
  }

  //说明泛型变量跟参数的类型没有关系！！
  // 我们的意图是用泛型变量来构建参数的类型的抽象模型！
}
{
  //泛型类型：
  let myIdentity: <T>(arg: T) => T;
  let myIdentity1: { <T>(arg: T): T };  //对象字面量
  //拿出对象字面量，放到接口里：高级抽象了！！
  interface IdentityFn<T> {
    (arg: T): T
  }

  let myIdentity2: IdentityFn<number>;
}
{
  //泛类型
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }

  let genericNumber = new GenericNumber<number>();
  genericNumber.zeroValue = 0;
  genericNumber.add = (x, y) => x + y;
  //当一个类的多处数据类型都是同一种类型的时候，就抽象出来！
  //注意实例部分可以用泛型类！！静态类型部分不可以用泛型类，
  // 因为静态部分没有实例化那一步，实例化的时候，是把抽象的泛型赋值的步骤！
}
{
  //泛型约束：
  function loggingIdentify<T>(arg: T): T {
    console.log(arg.length);   //这里不行T有木有length属性不知道！
    return arg;
  }

  interface LengthObj {
    length: number
  }

  function loggingIdentify1<T extends LengthObj>(arg: T): T {
    console.log(arg.length);   //这里不行T有木有length属性不知道！
    return arg;
  }

  //这就大大扩充了泛型的生产力了！
  //约束对象以及key：很实用！！！
  function f2<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  let obj = {s: 6, f: "g"};
  f2(obj, "s");
  f2(obj, "l");
}
{
  //泛型使用类类型，构造器用泛型：
  class BeeKeeper {
    hasMask: boolean;
  }

  class LionKeeper {
    nametag: string;
  }

  class Animal {
    numLengths: number;
  }

  class Bee extends Animal {
    keeper: BeeKeeper;
  }

  class Lion extends Animal {
    keeper: LionKeeper;
  }

  function createInstance<T extends Animal>(C: new() => T): T {
    return new C();
  }

  createInstance(Lion);  //类型推断出来T是哪个！
}
{
  //类型推断，不指出来类型
  let x = [2, "4", null];
  x.push(undefined);

  //最佳通用类型：
  //推断的优先级，就是能联合类型就联合类型，取得是并集，而不是交集：
  class Animal {
    name: string;
  }

  class Bee extends Animal {

  }

  class Lion extends Animal {

  }

  const zoom = [new Bee(), new Lion()];
  zoom.push();
  //这里的推断是 Bee|Lion[]而不是Animal[]
  // 明确点就是：
  const zoom1: Animal[] = [new Bee(), new Lion()];


  //上下文类型：
  document.onclick = e => {
    console.log(e.clickTime);  //推断e不可能有这个属性！类似于Vue的计算属性！！
  };
  // 只能显式告诉e的类型：
  document.onclick = (e: any) => {
    console.log(e.clickTime);
  };

  //其实下面的这个就是用的上下文类型做的推断，实现了最佳通用类型！！
  // const zoom1: Animal[] = [new Bee(), new Lion()];
}

{
  //交叉类型：取并集
  function extend<T, U>(a: T, b: U): T & U {
    const res = {} as T & U;
    for (let key in a) {
      res[key] = a[key] as any;   //这里是为了实现赋值的时候的 T 跟 T&U 的冲突
    }
    for (let key in b) {
      if (!res[key]) {
        res[key] = b[key] as any;
      }
    }
    return res;
  }

  class Person {
    constructor(public name: string) {
    }
  }

  interface Loggable {
    log(): void
  }

  class ConsoleLogger implements Loggable {
    log(): void {
    }
  }

  let jim = extend(new Person("jim"), new ConsoleLogger());
  jim.name;
  jim.log;
}
{
  //联合类型：
  function f3(v: string, padding: any) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + v;
    }
    if (typeof padding === "string") {
      return padding + v;
    }
    throw new Error("padding type error!!");
  }

  f3("hh", true);  //没被检测出来！！
  function f6(v: string, padding: string | number) {

  }

  f6("s", "f");
  f6("s", true);

  interface Bird {
    fly()

    layEggs()
  }

  interface Fish {
    swim()

    layEggs()
  }

  function getSmallPet<T>(arg: T): T {
    return arg;
  }

  let bird: Bird;
  let pet = getSmallPet<Fish | Bird>(bird);
  pet.swim();  //交集，而不是并集！！！

  if ((pet as Fish).swim) { //如此用！！
    (pet as Fish).swim();
  }

  //类型保护：
  //类型谓词 is
  const isFish = (pet: Fish | Bird): pet is Fish => {
    return (pet as Fish).swim !== undefined;
  };
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }

  //typeof 可以用于基本类型的数据的类型保护，特殊的类型还是要用类型谓词做！

  function paddingLeft(v: string, padding: number | string) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + v;
    } else {
      return Array(padding.length);  //可以用length属性！！
    }
  }

  //instanceof  类型保护：联合类的推断：
  class A {
    sayA() {

    }
  }

  class B {
    sayB() {

    }
  }

  const c = (): A | B => {
    return Math.random() > 0.5 ? new A() : new B();
  };
  const d = c();
  if (d instanceof A) {
    d.sayA();
  } else {
    d.sayB();
  }
}
{
  //null ,undefined任何类型的子类型！
  // 默认认为可以赋值为null ,undefined，要开启对null ,undefined的类型检验设置才行
  let s = "foo";
  s = null;   //不会报错，需要ts设置null的严格模式检查！
  let s1: string | null = "s";
  s1 = null;
  s1 = undefined;

  function f7(x: number, y?: number) {

  }

  f7(3, 5);
  f7(2);
  f7();
  f7(2, null);  //null严格模式下会报错！

  //去除null :
  function f8(v: string | null): string {
    return v || " ";
  }

  //！断言成符合要求的数据类型：
  function f9(name: string | null) {
    function postFix(epither: string) {
      return name.charCodeAt(0) + "the" + epither;
      //这里的name可能为null，会报错的！
    }

    name = name || "default";
    postFix(name);
  }

  function f10(name: string | null) {
    function postFix(epither: string) {
      return name!.charCodeAt(0) + "the" + epither;
      //这里的name可能为null，!断言
    }

    name = name || "default";
    postFix(name);
  }
}
{
  //字符串字面量：
  type Easing = "easy-in" | "easy-out" | "easy-in-out"
  const f = (easy: Easing) => {

  };
  f("easy-in");
  f("easy");
  f("null");
}


//JS动态，ts静态,JS超集，需要编译为js处理
{
  let a = 123;
  a = "d";
}
//优势，对变量的规范和类型的检测，报错，同时可读性更好。编辑器语法提示，写起来更爽！
{
  interface Data {
    x: number,
    y: number
  }

  const gougu = (data: Data): number =>
    Math.sqrt(
      data.x ** 2 + data.y ** 2
    );
}

//静态类型,变量被档案化备份，属性方法，值被指定了

{
  let count: number = 2;
  console.log(count);

  interface Person {
    name: string,
    age: number
  }

  const LiLei: Person = {
    name: "LiLei", age: 10
  };
}


//基础类型，对象类型：

{
  let x: number;
  x = 1;   //不赋值，无法使用
  console.log(x);

  const str: string = "s";

  const obj: { a: string } = {a: "r"};

  const numbers: number[] = [2, 3, "5"];

  //类
  class Person {
  }

  const b: Person = new Person();

  // 函数
  const getTotal: () => number = () => 2;
}

//类型推断，注解

{
  //类型注解，主动标识变量的类型
  let a: number;
  a = 4;

  //类型推断，不标识变量的类型，ts自动尝试分析变量类型，ts无法自动分析出类型，需要类型注解：
  let b = 40;
  b = "4";
  let c = a + b;
  c = "6";

  function sum(a, b) {   //a,b经过ts类型推断，得出any类型，所以需要类型注解
    return a + b;
  }

  const sum1 = sum(2, 4);

  // 简单的数据类型，可以用类型推断，一旦出现类型推断为any，就用类型注解
}
// 函数
{
  const a = () => {
  };
  const b = function () {

  };

  function c() {

  }

  //想要明确的返回值，限定死
  function sum(a: number, b: number) {
    return a + b + "";
  }

  const a: number = sum(2, 4);


  //无返回值，用void
  function x(): void {
    return 1;
  }

  x();

  //never 永远不可能执行完
  function y(): never {
    throw new Error("d");
    console.log(3);
  }

  y();

  function z(): never {
    while (true) {
    }
    console.log(3);
  }

  //解构参数注解：
  function d({a, b}: { a: number, b: number }) {

  }

  //写法1：
  const func: (str: string) => number = str => {
    return parseInt(str, 10);
  };
  //参数可以通过注解，返回值，简单的，常用的可推断的，可以不用注解
}
{
  const date = new Date();  //Date类型
  const rawData = "{a:1}";
  const newData = JSON.parse(rawData);  //这里无法判断newData的类型

  let temp: number | string = 123;
  temp = "w";
}

//数组
{
  const arr = [1, 4];
  arr.push("3");
  const arr1: (number | string)[] = [2, "4"];
  const arr2: undefined[] = [];
  const arr3: { name: string }[] = [{name: "3", b: 3}, {}];

  //类型别名：
  type User = { name: string, b: number }

  const arr4: User[] = [{name: "e", b: 4}];

  //类在ts里被检测类型的时候，当成对象检测：
  class Person {
    name: string;
    age: number;
  }

  const arr5: Person[] = [
    {name: "d", age: 4}
  ];
}

//元组
{
  // 需求是想要数组的下标的值，进行类型声明，而数组，上面的，只能笼统地声明数组内有什么类型
  const arr: (string | number)[] = [2, 4, "6"];
  //需求是想要[2,'6',4]这样，0坐标数字，1坐标字符串，2坐标数字，下标与类型绑定，有限可枚举的感觉
  const arr1: [number, string, number] = [2, "6", 4];
  //多应用于数据库文件vsc里的数据格式转换为元组类型！它就是可枚举的限制死的数组而已！
}

//interface 接口

{
  //定义通用性的变量数据类型
  interface Person {
    name: string,
    age?: number,   //可有可无
    readonly sex?: string  //只读，可有可无
  }

  function getName(data: Person) {
    return data.name;
  }

  function setName(data: Person, name: string) {
    data.name = name;
  }

  //与类型别名type 的区别
  type Person1 = { name: string }
  //没啥区别，但是type可以定义基本类型
  type X = string

  interface Y

  string; //不行，只能定义函数或对象
  //能用interface 就用！

  const data = {
    name: "s",
    x: 5  //不是Person类型
  };
  getName(data);  //不报错，因为对变量的检查，只看符不符合必须有的类型属性，字面量检查不严格
  setName(data, "r");
  getName({
    name: "s",
    x: 5  //不是Person类型  ,报错了，不是字面量形式，ts检查很严格
  });

  //想要多出其他的可扩展的属性，用：
  interface Person2 {
    name: string,
    age?: number,   //可有可无
    readonly sex?: string  //只读，可有可无
    [propName: string]: any  //预留扩展
  }

  //可以添加方法：
  interface Person3 {
    name: string,
    age?: number,   //可有可无
    readonly sex?: string,  //只读，可有可无
    say(): string
  }

  //类应用接口：类必须要有接口里的方法属性

  class Teacher implements Person3 {
    name = "r";   //必须要有
    say(): string {  //必须要有
      return "r";
    }
  }

  // 继承
  interface Man extends Person {
    do(): void   //自己私有的，并且继承了Person的必须有的。
  }

  const man: Man = {
    name: "f"
  };
  const man1: Man = {
    name: "g",
    do(): void {

    }
  };

  //函数接口,用的不多
  interface SayHi {
    (str: string): string
  }

  const sayHi: SayHi = (str) => str;
}


//类
{
  // 声明
  class Person {
    name = "dell";

    getName() {
      return this.name;
    }
  }

  const person = new Person();    //Person类


  //继承
  class Teacher extends Person {
    getTeacherName() {     //私有的
      return "teacher";
    }

    getName(): string {      //覆盖掉父类的方法
      return "lee" + super.getName();    //调用父类的方法属性
    }
  }
}

// 类的访问类型，构造器

{
  //public 类内外都可以被使用

  class Person {
    name: string;   //默认为 public
    sayHi() {
      this.name;   //类内
      console.log("hi");
    }
  }

  const person = new Person();
  person.name = "dell";      //类外
  console.log(person.name);
  person.sayHi();    //类外
}
{
  //private 类内被使用

  class Person {
    private name: string;   //默认为 public
    sayHi() {
      this.name;   //类内
      console.log("hi");
    }
  }

  const person = new Person();
  person.name = "dell";      //类外
  console.log(person.name);
  person.sayHi();    //类外

  class Teacher extends Person {
    sayHi() {
      this.name;     //继承子类中使用
      super.sayHi();
    }
  }
}
{
  {
    //protected 类内和继承子类,实例中不可以！

    class Person {
      protected name: string;   //默认为 public
      sayHi() {
        this.name;   //类内
        console.log("hi");
      }
    }

    const person = new Person();
    person.name = "dell";      //类外
    console.log(person.name);
    person.sayHi();    //类外
    class Teacher extends Person {
      sayHi() {
        this.name;     //继承子类中使用
        super.sayHi();
      }
    }

    const teacher = new Teacher();
    teacher.name;   //实例中使用
  }
}

//constructor

{
  class Person {
    //传统写法
    name: string;

    constructor(name: string) {   //new 的时候，自动执行！
      this.name = name;
    }
  }

  class Person1 {
    //简写写法
    constructor(public name: string) {   //new 的时候，自动执行！

    }
  }

  const person = new Person1("dell");
}
{
  class Person {
    constructor(public name: string) {
    }
  }

  class Teacher extends Person {
    constructor() {
      super();   //为了实现继承操作，也就是实现原型链的链接，所以必须要有这步！
      //传不传参，看父类的构造器的参数！为了实现初始化
    }
  }

  class Man extends Person {
    constructor() {
      super("man");
    }
  }

  //就算父类没有构造器：
  class X {

  }

  class Y extends X {
    constructor() {
      super();  //这步也要有，为了实现原型链
    }

  }
}

// 静态属性，getter,setter

{
  class Person {
    constructor(private _name: string) {   //私有属性
    }

    //但是想要外部拿到这个属性的值，用get中转：
    get name() {
      return this._name + "xx";
    }

    //有了getter就必须要有setter:
    set name(name: string) {
      this._name = name;
    }
  }

  const person = new Person("liu");
  person._name;   //想要一些变量私有化,外部不能直接拿到
  person.name;
  person.name = "haha";  //想设置，因为有getter,设置就需要setter了,没setter,属性是read-only的

  //静态属性，单例模式：
  class A {

  }

  const a1 = new A();
  const a2 = new A();

  // 这样得到的两个实例是两个不同的实例
  class B {
    constructor(name: string) {

    }

    private static instance: B;

    static getInstance(name: string) {  //类的静态属性，只有类自己可以调用
      if (!this.instance) {
        this.instance = new B(name);
      }
      return this.instance;
    }
  }

  const b1 = B.getInstance("b1");
  const b2 = B.getInstance("b2");
}

//抽象类
{
  //多个类有共性的属性方法，就提出来一个抽象类，然后继承这个抽象类：
  abstract class Person {
    name: string;

    abstract getName(): string
  }

  class Teacher extends Person {  //继承了抽象类的属性方法后，就一定要有这些！
    getName(): string {
      return "d";
    }
  }
}
//接口抽象
{
  interface Teacher {
    name: string
  }

  interface Student {
    name: string,
    age: number
  }

  const getName = (data: Student | Teacher) => data.name;

  //提取公共属性：
  interface Person {
    name: string
  }

  interface Student1 extends Person {
    age: number
  }

  interface Teacher extends Person {
    teachingAge: number
  }

  const getName1 = (data: Person) => data.name;
}

//联合类型，类型保护

{
  interface Bird {
    fly: boolean

    sing(): void
  }

  interface Dog {
    fly: boolean

    dark(): void
  }

  function trainAnimal(animal: Bird | Dog) {
    animal.fly;     //联合类型，只默认为公有的属性方法，各自私有的联合类型不会有！
    animal.sing();   //需要类型保护
    animal.dark();  //需要类型保护

    // 类型断言进行类型保护：
    if (animal.fly) {
      (animal as Bird).sing();
    } else {
      (animal as Dog).dark();
    }

    // in语法来做类型保护
    if ("sing" in animal) {  //这里的ts会很智能！适用于很互补的联合类型！
      animal.sing();
    } else {
      animal.dark();
    }
  }

  //typeof 对普通类型的联合类型做保护
  function X(a: number | string, b: number | string) {
    a + b; //不行
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
  }

  // instanceof  对类的联合类型的类型保护
  class A {
    count: number;
  }

  function add(first: object | A, second: object | A) {
    first.count;
    second.count;
    if (first instanceof A) {
      first.count;
    }
  }
}

// 枚举类型
{
  enum Status {
    OFFLINE,
    ONLINE,
    DELETED
  }

  //等同于这样的对象：
  // {
  //   OFFLINE:0,
  //   ONLINE:1,
  //   DELETED:2,
  //   0:'OFFLINE',
  //   1:'ONLINE',
  //   2:'DELETED'
  // }
  // 相当于字典，而且是双向映射的字典，key-value,value-key。

  //调用：
  Status[0];
  Status.ONLINE;

  //默认是从0开始自增的。可以自定义从哪里由多少开始自增
  {
    enum Status {
      OFFLINE,
      ONLINE = 3,
      DELETED
    }

    enum Status1 {
      OFFLINE = 1,
      ONLINE,
      DELETED
    }

    Status1[0];   //undefined
  }
}


//函数泛型

{
  function X(a: number | string, b: number | string) {
    return `S{a}${b}`;
  }

  function x1(a: number, b: number) {

  }

  function x2(a: string, b: string) {

  }

  //有逻辑可以共用，抽象提升一层：
  function x3<T>(a: T, b: T) {

  }

  x3<string>("d", 4);
  x3<string>("d", "4");

  //对参数的类型可以深加工：
  function x4<T>(a: T[]) {

  }

  x4<string>(["d"]);

  //对函数的返回值设置:
  function x5<T>(a: T, b: T): T {
    return a;
  }

  //ts 会自动推断，如果不显式定义类型：
  x5("r", "g");
}
// 类中的泛型
{
  class DateMananer {
    constructor(private data: string[] | number[]) {
    }

    getItem(index: number): string | number {
      return this.data[index];
    }
  }

  const dataManager = new DateMananer([2]);
  dataManager.getItem(0);

  //有并列的因果映射，可以再次深层抽象化的逻辑：
  class DataManager1<T> {   //把可编程的那部分公共逻辑，抽离成泛型的参数
    constructor(private data: T[]) {
    }

    getItem(ind: number): T {
      return this.data[ind];
    }
  }

  // 泛型的继承
  //假如T里面必须要有某些属性或者方法：
  interface Item {
    name: string
  }

  class DataManager<T extends Item> {
    constructor(private data: T[]) {
    }

    getItemName(ind: number): string {
      return this.data[ind].name;
    }
  }

  //泛型的取值的限制，指定个别类型：
  class A<T extends string | number> {  //T限制在string/number类型中了
    constructor(private data: T[]) {
    }

    getItem(ind: number): T {
      const val = this.data[ind];
      if (typeof val === "string")
        return val.slice(0) as T;
      if (typeof val === "number")
        return (val + 3) as T;
      return val;
    }
  }

  type T = number | string

  class B<X> {
    constructor(private data: X[]) {
    }

    getItem(index: number) {
      const val = this.data[index];
      if ("slice" in val) {
        return val + "l";
      }
      if (typeof val === "number") {
        return val + 4;
      }
    }

    push(item: X) {
      this.data.push(item);
    }
  }


  const b = new B<T>([0]);
  const n = b.getItem(0) + "d";
  b.push(n);


  //用泛型做类型注解：
  const f: () => string = () => {
    return "ss";
  };
  type F = <T>(param: T) => T
  const f1: F = (val) => {
    return val;
  };
}

// 命名空间
{
  //编译后都是全局变量：
  class Header {
    constructor(){
      const elem = document.createElement('div')
      elem.innerText = 'header'
      document.appendChild(elem)
    }
  }
  class Content {
    constructor(){
      const elem = document.createElement('div')
      elem.innerText = 'content'
      document.appendChild(elem)
    }
  }
  class Footer {
    constructor(){
      const elem = document.createElement('div')
      elem.innerText = 'footer'
      document.appendChild(elem)
    }
  }
  class Page {
    constructor() {
      new Header()
      new Content()
      new Footer()
    }
  }

  //namespace 为的是像webpack那样，模块化开发，编译打包后都是一个个闭包函数，
  //暴露出来预留的接口！使用方法：
  namespace Home {
    class Header {
      constructor(){
        const elem = document.createElement('div')
        elem.innerText = 'header'
        document.appendChild(elem)
      }
    }
    class Content {
      constructor(){
        const elem = document.createElement('div')
        elem.innerText = 'content'
        document.appendChild(elem)
      }
    }
    class Footer {
      constructor(){
        const elem = document.createElement('div')
        elem.innerText = 'footer'
        document.appendChild(elem)
      }
    }
    export class Page {   //暴露的
      constructor() {
        new Header()
        new Content()
        new Footer()
      }
    }
  }
  Home.Page   //能暴露什么，就要加上export
  Home.Header
  Home.Content

  // 命名空间的跨文件引用
  {
    namespace Components{
      //可以导出类型定义：
      export interface User {
        name:string
      }
      export class X {

      }
      //还可以嵌套命名空间：
      export namespace Child{
        export class A {

        }
      }
    }

    //其他文件引用Components时，可以直接引用，因为这是全局的变量Components，
    //但是为了可读性，其他文件引用的出处表示，可以加上:
    ///<reference path='./**/**.**' />
  }
  Components.X
  const user :Components.User ={name:7}
  Components.Child.A

  //跨文件引用，打包时会报错，因为打包了多个文件结果，html文件只会导入一个打包结果，否则太麻烦了
  //只有打包成一个文件：
  //配置 outFile，设置打包的路径和最终文件名，同时配置module为amd，commonjs已经不够用了，会报错！

}
//import 导入模块
{
  //modules : amd   模式，需要导入cdn 的 require.js的补充文件！
  //ts文件需要export 导出模块
  //使用模块 ：
  require(['Home'],function(page){   //requireJS的使用。
    new page.default()
  })
  //webpack 会自动打包，不需要人为导入require.js。
}
