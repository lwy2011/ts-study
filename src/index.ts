import {RequireConfig} from "./types";
import xml from "./xml";
import makeURL from "./helpers/url";
import {isPlainObject} from "./helpers/util";
import transformReqData from "./helpers/data";

const axios = (config: RequireConfig): void => {
  processConfig(config);
  xml(config);
};

function processConfig(config: RequireConfig) {
  config.url = transformURL(config);
  config.data = transformRequireData(config);
}

function transformURL({url, params}: RequireConfig): string {
  return makeURL(url, params);
}

function transformRequireData({data}: RequireConfig) {
  return transformReqData(data);
}

export default axios;
