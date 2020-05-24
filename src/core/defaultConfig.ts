import {RequestConfig} from "../types";


export const defaultConfig: RequestConfig = {
  methods: "get",
  timeout: 0,
  headers: {
    common: {
      "Accept": "application/json,text/plain, */*"
    },

  }
};

const methodsNoData = ["delete", "head", "get", "options"],
  methodsHasData = ["put", "post", "patch"];
methodsNoData.map(
  k => {
    defaultConfig.headers[k] = {};
  }
);
methodsHasData.map(
  k => {
    defaultConfig.headers[k] = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
  }
);


