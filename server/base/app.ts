import axios from "../../src";


axios(
  {
    url: "/base/get",
    methods: "get",
    params: {
      a: 1, b: 4
    }
  }
);
axios(
  {
    url: "/base/get",
    methods: "get",
    params: {
      a: 1, b: [4, 6, "hh"]
    }
  }
);
axios(
  {
    url: "/base/get",
    methods: "get",
    params: {
      a: 1, b: new Date()
    }
  }
);
axios(
  {
    url: "/base/get",
    methods: "get",
    params: {
      a: "@, "
    }
  }
);
axios(
  {
    url: "/base/get#hash",
    methods: "get",
    params: {
      a: 1, b: {
        foo: "xxx"
      }
    }
  }
);
axios(
  {
    url: "/base/get?c=8",
    methods: "get",
    params: {
      a: 1, b: undefined
    }
  }
);
axios(
  {
    url: "/base/post",
    methods: "post",
    data: {
      a: 1, b: [34, 66]
    }
  }
);
const arr = new Int32Array([20, 30]);
axios({
  methods: "post", url: "/base/buffer",
  data: arr
});
