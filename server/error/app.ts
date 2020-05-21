import axios from "../../src";
import {AxiosError} from "../../src/types";


axios(
  {
    url: "/error/get",
    methods: "get",
    params: {
      a: 1, b: 4
    }
  }
).then(
  res => {
    console.log(res);
  }
).catch(
  e => {
    console.log(e);
  }
);
axios(
  {
    url: "/error/get1",
    methods: "get",
    params: {
      a: 1, b: 4
    }
  }
).then(
  res => {
    console.log(res);
  }
).catch(
  e => {
    console.log(e);
  }
);

axios(
  {
    url: "/error/timeout",
    methods: "get",
    params: {
      a: 1, b: 4
    },
    timeout: 2000
  }
).then(
  res => {
    console.log(res);
  }
).catch(
  e => {
    console.log(e);
  }
);

axios(
  {
    url: "/error/responseFailed",
    methods: "get",
    params: {
      a: 1, b: 4
    }
  }
).then(
  res => {
    console.log(res);
  }
).catch(
  (e:AxiosError)=> {
    console.log(e.message,e.request,e.response,e.config,e.code);
  }
);
//模拟网络错误，刷新页面后，浏览器设置网络关闭进行模拟！
setTimeout(
  () => {
    axios(
      {
        url: "/error/get",
        methods: "get",
        params: {
          a: 1, b: 4
        }
      }
    ).then(
      res => {
        console.log(res);
      }
    ).catch(
      e => {
        console.log(e);
      }
    );
  }, 4000
);
