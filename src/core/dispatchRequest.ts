import {AxiosPromise, RequestConfig} from "../types";
import xml from "../core/xml";
import makeURL from "../helpers/url";
import transformReqData, {transformResData} from "../helpers/data";
import processHeaders from "../helpers/headers";

export const dispatchRequest = (config: RequestConfig): AxiosPromise => {
  processConfig(config);
  return xml(config).then(
    res => {
      res.data = transformResponseData(res.data);
      console.log(res,'res');
      return res;
    }
  );
};

function processConfig(config: RequestConfig) {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequireData(config);
}

function transformURL({url, params}: RequestConfig): string {
  return makeURL(url!, params);
}

function transformRequireData({data}: RequestConfig) {
  return transformReqData(data);
}

function transformHeaders({headers = {}, data}: RequestConfig) {
  return processHeaders(headers, data);
}

function transformResponseData(data: any): any {
  return transformResData(data);
}


