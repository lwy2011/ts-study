import axios from "../../src";


axios(
  {
    url: "/simple/get",
    methods: "get",
    params: {
      a: 1, b: 4
    }
  }
);
