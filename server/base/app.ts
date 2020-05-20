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
axios(
  {
    url: "/base/post",
    methods: "post",
    data: {
      a: 2, b: [34, 66]
    },
    headers: {
      "content-type": "application/json",
      "Accept": "application/json,text/plain,*/*"
    }
  }
);
const paramsString = "x=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);
axios(
  {
    url: "/base/post",
    methods: "post",
    data: searchParams
  }
);


axios(
  {
    url: "/base/post",
    methods: "post",
    data: {
      a: 6, b: 8
    }
  }
).then(
  res => {
    console.log(res);
  }
);

axios(
  {
    url: "/base/post",
    methods: "post",
    data: {
      a: 6, b: 8
    },
    responseType: "json"
  }
).then(
  res => {
    console.log(res);
  }
);
