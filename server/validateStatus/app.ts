import axios from "../../src";
import {AxiosError} from "../../src/types";


axios(
  {
    url: "/more/validateStatus",
    methods: "get"
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
    url: "/more/validateStatus",
    methods: "get",
    validateStatus(status){
      return status>=200 && status<400
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
