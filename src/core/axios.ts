import {AxiosPromise, RequestConfig} from "../types";
import {dispatchRequest} from "./dispatchRequest";


export class Axios {
  request(url: any, config?: RequestConfig): AxiosPromise {
    if (typeof url === "string") {
      config = config || {};
      config.url = url;
    } else {
      config = url as RequestConfig;
    }
    return dispatchRequest(config);
  }

  _processDispatchRequestWithoutData(url: string, methods: string, config?: RequestConfig): AxiosPromise {
    return dispatchRequest(Object.assign(config || {url}, {url, methods}));
  }

  get(url: string, config?: RequestConfig): AxiosPromise {
    return this._processDispatchRequestWithoutData(url, "get", config);
  }

  delete(url: string, config?: RequestConfig): AxiosPromise {
    return this._processDispatchRequestWithoutData(url, "delete", config);
  }

  head(url: string, config?: RequestConfig): AxiosPromise {
    return this._processDispatchRequestWithoutData(url, "head", config);
  }

  options(url: string, config?: RequestConfig): AxiosPromise {
    return this._processDispatchRequestWithoutData(url, "options", config);
  }

  _processDispatchRequestWithData(url: string, methods: string, data?: any, config?: RequestConfig): AxiosPromise {
    return dispatchRequest(Object.assign(config || {url}, {url, methods, data}));
  }

  post(url: string, data?: any, config?: RequestConfig): AxiosPromise {
    return this._processDispatchRequestWithData(
      url, "post", data, config
    );
  }

  put(url: string, data?: any, config?: RequestConfig): AxiosPromise {
    return this._processDispatchRequestWithData(
      url, "put", data, config
    );
  }

  patch(url: string, data?: any, config?: RequestConfig): AxiosPromise {
    return this._processDispatchRequestWithData(
      url, "patch", data, config
    );
  }
}
