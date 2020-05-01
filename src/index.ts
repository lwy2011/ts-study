function x(p: string) {
    return "hello " + p;
}

let p = "liu";

console.log(x(p));
console.log(x(p,9));
p = 5
console.log(x(p));

//类型注解，类型报错，参数个数报错！但是编辑依然成功！！
//定位为数据的检查器，语法的检查器！