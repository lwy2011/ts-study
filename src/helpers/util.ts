const _toString = Object.prototype.toString;


const isDate = (obj: any): obj is Date => {
  return _toString.call(obj) === "[object Date]";
};

const isObject = (obj: any): obj is object => {
  return obj && typeof obj === "object";
};

const encode = (str: string): string => {
  str = encodeURIComponent(str);
  return str.replace(/%40/g, "@")
    .replace(/%3A/ig, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/ig, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/ig, "[")
    .replace(/%5D/ig, "]");
};
const isPlainObject = (obj: any): obj is object => {
  return _toString.call(obj) === "[object Object]";
};
export {isDate, isObject, encode,isPlainObject};

export function extend<T,U>(to:T,from:U):T&U{
  for (const k in from ){
    ;(to as T&U)[k] = from[k] as any
    //；是为了语法，to as T&U是为了可以用k，from[k] as any是为了赋值可以成功，因为前面的T&U类型！
  }
  return to as T&U
}
