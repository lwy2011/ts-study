import {RequireConfig} from "./types";
import xml from "./xml";
import makeURL from "./helpers/url";

const axios = (config: RequireConfig): void => {
  processConfig(config);
  xml(config);
};

function processConfig(config: RequireConfig) {
  config.url = transformURL(config);
}

function transformURL({url, params}: RequireConfig): string {
  return makeURL(url, params);
}

export default axios;
