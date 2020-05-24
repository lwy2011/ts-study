import {
  AxiosPromise,
  AxiosResponse,
  RejectFn,
  RequestConfig,
  ResolveFn
} from "../types";
import {dispatchRequest} from "./dispatchRequest";
import {InterceptorManager} from "./interceptorManager";
import {deepMerge} from "../helpers/util";
import {mergeConfig} from "./mergeConfig";


interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: RequestConfig) => AxiosPromise)
  rejected?: RejectFn
}

export class Axios {
  interceptors: {
    request: InterceptorManager<RequestConfig>
    response: InterceptorManager<AxiosResponse>
  };
  defaultConfig: RequestConfig;

  constructor(defaultConfig: RequestConfig) {
    this.defaultConfig = defaultConfig;
    this.interceptors = {
      request: new InterceptorManager<RequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    };
  }

  request(url: any, config?: RequestConfig): AxiosPromise {
    if (typeof url === "string") {
      config = config || {};
      config.url = url;
    } else {
      config = url as RequestConfig;
    }
    config = mergeConfig(this.defaultConfig, config);
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest, rejected: undefined
      }
    ];
    this.interceptors.request.forEach(
      (interceptor) => {
        chain.unshift(interceptor);
      }
    );
    this.interceptors.response.forEach(
      (interceptor) => {
        chain.push(interceptor);
      }
    );
    let promise = Promise.resolve(config);
    while (chain.length) {
      const {resolved, rejected} = chain.shift()!;   //断言一下
      promise = promise.then(resolved, rejected);
    }
    return promise as AxiosPromise;   //这里不懂为什么会跟人家的不报错，推断出来了，我这推断不出来
    // return dispatchRequest(config);
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
