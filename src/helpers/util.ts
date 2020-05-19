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
