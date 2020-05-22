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
export interface AxiosResponse<T=any> {
  data:T
  status:number
  statusText:string
  headers:any
  config:RequestConfig
  request:any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>>{

}


export interface AxiosError extends Error {
  config:RequestConfig
  isAxiosError:boolean
  code?:string|null
  request?:XMLHttpRequest
  response?:AxiosResponse
}

export interface Axios {
  request<T=any>(config:RequestConfig):AxiosPromise<T>
  get<T=any>(url:string,config?:RequestConfig):AxiosPromise<T>
  delete<T=any>(url:string,config?:RequestConfig):AxiosPromise<T>
  head<T=any>(url:string,config?:RequestConfig):AxiosPromise<T>
  options<T=any>(url:string,config?:RequestConfig):AxiosPromise<T>
  post<T=any>(url:string,data?:any,config?:RequestConfig):AxiosPromise<T>
  put<T=any>(url:string,data?:any,config?:RequestConfig):AxiosPromise<T>
  patch<T=any>(url:string,data?:any,config?:RequestConfig):AxiosPromise<T>
}
export interface AxiosInstance extends Axios {
  <T=any>(config:RequestConfig):AxiosPromise<T>
  <T=any>(url:string,config?:RequestConfig):AxiosPromise<T>
}
