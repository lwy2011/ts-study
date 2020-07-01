import axios from "../../src";
import qs from "qs";
import {AxiosTransform} from "../../src/types";

// document.cookie = "a=b";
//
// axios.get("/more/get").then(
//   res => {
//     console.log(res);
//   }
// );
//
// axios.post(
//   "http://127.0.0.1:8088/more/server2", {},
//   {
//     withCredentials: false
//   }
// ).then(
//   res => {
//     console.log(res, 1);
//   }
// );
//
// axios.post(
//   "http://127.0.0.1:8088/more/server2", {},
//   {
//     withCredentials: true
//   }
// ).then(
//   res => {
//     console.log(res, 2);
//   }
// );


//防止xsrf攻击：服务端出key:value,设置成cookie，前端把key1：value设置到request header上，后端检查！
const instance = axios.create({   //如此做的目的是，初始化的defaultConfig是独立的新对象。
  xsrfHeaderName: "X-XSRF-TOKEN-D",
  xsrfCookieName: "XSRF-TOKEN-D"
});



instance.get("/more/get").then(
  res => {
    console.log(res,9);
  }
);
