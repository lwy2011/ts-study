type Methods = 'get' | 'GET'
|'post'|'POST'
|'delete'|'DELETE'
|'options'|'OPTIONS'
|'head'|'HEAD'
|'put'|'PUT'
|'patch'|'PATCH'

export interface RequestConfig {
  url?:string
  methods?:Methods
  data?:any
  params?:any
  headers?:any
  responseType?:XMLHttpRequestResponseType
  timeout?:number
}
export interface AxiosResponse {
  data:any
  status:number
  statusText:string
  headers:any
  config:RequestConfig
  request:any
}

export interface AxiosPromise extends Promise<AxiosResponse>{

}


export interface AxiosError extends Error {
  config:RequestConfig
  isAxiosError:boolean
  code?:string|null
  request?:XMLHttpRequest
  response?:AxiosResponse
}

export interface Axios {
  request(config:RequestConfig):AxiosPromise
  get(url:string,config?:RequestConfig):AxiosPromise
  delete(url:string,config?:RequestConfig):AxiosPromise
  head(url:string,config?:RequestConfig):AxiosPromise
  options(url:string,config?:RequestConfig):AxiosPromise
  post(url:string,data?:any,config?:RequestConfig):AxiosPromise
  put(url:string,data?:any,config?:RequestConfig):AxiosPromise
  patch(url:string,data?:any,config?:RequestConfig):AxiosPromise
}
export interface AxiosInstance extends Axios {
  (config:RequestConfig):AxiosPromise
  (url:string,config?:RequestConfig):AxiosPromise
}
