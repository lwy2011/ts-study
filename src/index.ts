import {AxiosPromise, RequestConfig} from "./types";
import xml from "./xml";
import makeURL from "./helpers/url";
import transformReqData from "./helpers/data";
import processHeaders from "./helpers/headers";

const axios = (config: RequestConfig): AxiosPromise => {
  processConfig(config);
  return xml(config);
};

function processConfig(config: RequestConfig) {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequireData(config);
}

function transformURL({url, params}: RequestConfig): string {
  return makeURL(url, params);
}

function transformRequireData({data}: RequestConfig) {
  return transformReqData(data);
}

function transformHeaders({headers={}, data}: RequestConfig) {
  return processHeaders(headers, data);
}

export default axios;
