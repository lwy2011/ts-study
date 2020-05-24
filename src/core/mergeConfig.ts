import {RequestConfig} from "../types";
import {deepMerge, isPlainObject} from "../helpers/util";

function defaultStrat(val1: any, val2: any): any {
  return val2 !== undefined ? val2 : val1;
}

function stratFromval2(val1: any, val2: any): any {
  if (val2 !== undefined) return val2;
}

const keysFromVal2 = ["url", "data", "params"];

const strats = Object.create(null);
keysFromVal2.map(
  key => strats[key] = stratFromval2
);

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (val2 !== undefined) {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (val1 !== undefined) {
    return val1;
  }
}

const stratKeysDeepMerge = ["headers"];
stratKeysDeepMerge.map(
  key => {
    strats[key] = deepMergeStrat;
  }
);
export const mergeConfig = (config1: RequestConfig, config2?: RequestConfig): RequestConfig => {
  config2 = config2 || {};

  console.log(config1, config2, "cc");

  const config = Object.create(null);  //无原型！
  for (let key in config2) {
    mergeField(key);
    // console.log(config,'fff');
  }
  for (let key in config1) {
    if (config2[key] === undefined) {
      mergeField(key);
    }
  }


  function mergeField(k: string) {
    let strat = strats[k] || defaultStrat;
    config[k] = strat(config1[k], config2![k]);  //强制断言不是undefined ,上面预留了
  }

  console.log(config);
  return config;
};
