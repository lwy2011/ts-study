import axios from "../../src";
import qs from "qs";
import {AxiosTransform} from "../../src/types";

axios.defaultConfig.headers.common["test1"] = "123";
axios({
  url: "/default_config",
  methods: "post",
  data: qs.stringify({a: 1}),
  headers: {
    test: 234
  }
}).then(
  res => {
    console.log(res);
  }
);

// axios({
//   url: "/default_config",
//   methods: "post",
//   data: {a: 1},
//   headers: {
//     test: 234
//   },
//   transformRequest: [
//     function (data) {
//       return qs.stringify(data);
//     },
//     ...(axios.defaultConfig.transformRequest as AxiosTransform[])
//   ],
//   transformResponse: [
//     ...(axios.defaultConfig.transformResponse as AxiosTransform[]),
//     function (data) {
//       data.test0 = "对请求的data,headers,响应的data的预处理！相当于埋钩子！";
//       return data;
//     }
//   ]
// }).then(
//   res => {
//     console.log(res.data);
//   }
// );

const instance = axios.create({   //如此做的目的是，初始化的defaultConfig是独立的新对象。
  transformRequest: [
    function (data) {
      return qs.stringify(data);
    },
    ...(axios.defaultConfig.transformRequest as AxiosTransform[])
  ],
  transformResponse: [
    ...(axios.defaultConfig.transformResponse as AxiosTransform[]),
    function (data) {
      data.test0 = "对请求的data,headers,响应的data的预处理！相当于埋钩子！";
      return data;
    }
  ]
});

instance({
  url: "/default_config",
  methods: "post",
  data: {a: 1},
  headers: {
    test: 234
  }
}).then(
  res => {
    console.log(res);
  }
);
