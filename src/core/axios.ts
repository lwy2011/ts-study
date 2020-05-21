import {AxiosPromise, RequestConfig} from "../types";
import {dispatchRequest} from "./dispatchRequest";


export class Axios {
  request(config: RequestConfig): AxiosPromise {
    return dispatchRequest(config);
  }

  _processDispatchRequestWithoutData(url: string, method: string, config?: RequestConfig):AxiosPromise {
    return dispatchRequest(Object.assign(config || {url}, {url, method}));
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

  _processDispatchRequestWithData(url:string,method:string,data?:any,config?:RequestConfig):AxiosPromise {
    return dispatchRequest(Object.assign(config || {url}, {url, method,data}));
  }
  post(url:string,data?:any,config?:RequestConfig):AxiosPromise{
    return this._processDispatchRequestWithData(
      url,'post',data,config
    )
  }
  put(url:string,data?:any,config?:RequestConfig):AxiosPromise{
    return this._processDispatchRequestWithData(
      url,'put',data,config
    )
  }
  patch(url:string,data?:any,config?:RequestConfig):AxiosPromise{
    return this._processDispatchRequestWithData(
      url,'patch',data,config
    )
  }
}
