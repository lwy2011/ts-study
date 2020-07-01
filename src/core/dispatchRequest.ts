import {AxiosPromise, RequestConfig} from "../types";
import xml from "../core/xml";
import makeURL from "../helpers/url";
import {flattenHeaders} from "../helpers/headers";
import {transform} from "./transform";

export const dispatchRequest = (config: RequestConfig): AxiosPromise => {
  throwIfCancellationRequested(config);  //防抖
  processConfig(config);
  return xml(config).then(
    res => {
      res.data = transform(res.data, res.headers, res.config.transformResponse);
      return res;
    }
  );
};

function processConfig(config: RequestConfig) {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.methods!);  //断言一定会有的！
  console.log(config, "ccc");
}

function transformURL({url, params}: RequestConfig): string {
  return makeURL(url!, params);
}

// function transformRequireData({data}: RequestConfig) {
//   return transformReqData(data);
// }
//
// function transformHeaders({headers = {}, data}: RequestConfig) {
//   return processHeaders(headers, data);
// }

// function transformResponseData(data: any): any {
//   return transformResData(data);
// }

function throwIfCancellationRequested(config: RequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

