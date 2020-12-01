import {RequestConfig} from "../types";
import transformReqData, {transformResData} from "../helpers/data";
import processHeaders from "../helpers/headers";


export const defaultConfig: RequestConfig = {
  methods: "get",
  timeout: 0,
  headers: {
    common: {
      "Accept": "application/json,text/plain, */*"
    },

  },
  transformRequest: [
    function (data: any, headers: any): any {
      processHeaders(headers, data);
      return transformReqData(data);
    }
  ],
  transformResponse: [
    function (data: any): any {
      return transformResData(data);
    }
  ],
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  validateStatus(status){
    return status>=200 && status<300
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


