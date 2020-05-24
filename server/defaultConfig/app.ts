import axios from "../../src";
import qs from "qs";

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
