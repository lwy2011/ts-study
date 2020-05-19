import {RequireConfig} from "./types";
import xml from "./xml";
import makeURL from "./helpers/url";
import transformReqData from "./helpers/data";
import processHeaders from "./helpers/headers";

const axios = (config: RequireConfig): void => {
  processConfig(config);
  xml(config);
};

function processConfig(config: RequireConfig) {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequireData(config);
}

function transformURL({url, params}: RequireConfig): string {
  return makeURL(url, params);
}

function transformRequireData({data}: RequireConfig) {
  return transformReqData(data);
}

function transformHeaders({headers={}, data}: RequireConfig) {
  return processHeaders(headers, data);
}

export default axios;
