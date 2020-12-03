import axios from "../../src";
import {AxiosError} from "../../src/types";
import qs from "qs";


axios(
  {
    url: "/more/paramsSerializer",
    methods: "get",
    params: {
      a: 2, h: 4, c: [3, 6]
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
    url: "/more/paramsSerializer",
    methods: "get",
    params: new URLSearchParams("a=3&b=5")
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

const instance = axios.create(
  {
    paramsSerializer(params) {
      return qs.stringify(params, {arrayFormat: "brackets"});
    }
  }
);
instance.get("/more/paramsSerializer", {
  params: {a: 2, h: 4, c: [3, 6]}
});
