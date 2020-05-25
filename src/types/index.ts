export type Methods = "get" | "GET"
  | "post" | "POST"
  | "delete" | "DELETE"
  | "options" | "OPTIONS"
  | "head" | "HEAD"
  | "put" | "PUT"
  | "patch" | "PATCH"

export interface RequestConfig {
  url?: string
  methods?: Methods
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  transformRequest?: AxiosTransform | AxiosTransform[]
  transformResponse?: AxiosTransform | AxiosTransform[]

  cancelToken?:CancelToken

  [k: string]: any   //字符串索引签名
}

export interface AxiosTransform {
  (data: any, headers?: any): any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}


export interface AxiosError extends Error {
  config: RequestConfig
  isAxiosError: boolean
  code?: string | null
  request?: XMLHttpRequest
  response?: AxiosResponse
}

export interface Axios {
  interceptors: {
    request: InterceptorManager<RequestConfig>
    response: InterceptorManager<AxiosResponse>
  };

  defaultConfig: RequestConfig

  request<T = any>(config: RequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: RequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: RequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: RequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: RequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: RequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: RequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?:RequestConfig):AxiosInstance
  cancelToken:CancelToken
  cancel:CancelStatic
  isCancel:(data:any)=>boolean
}

export interface InterceptorManager<T> {
  use(resolveFn: ResolveFn<T>, rejectFn?: RejectFn): number

  eject(id: number): void

  // forEach(interceptor:Interceptor<T>):void 内部方法，不让外部用
}

export interface ResolveFn<T> {
  (config: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

export interface CancelToken {  //这是实例的接口，下面的是类的接口！
  promise:Promise<Cancel>
  reason?:Cancel
  throwIfRequested():void
}
export interface Canceler {
  (msg?:string):void
}
export interface CancelExecutor {
  (cancel:Canceler):void
}
export interface CancelTokenSource {
  token:CancelToken
  cancel:Canceler
}

export interface CancelTokenStatic {  //这是类的接口
  new(executor:CancelExecutor):CancelToken
  source():CancelTokenSource
}

export interface Cancel {
  message?:string
}
export interface CancelStatic {
  new(message?:string):Cancel
}
