type Methods = 'get' | 'GET'
|'post'|'POST'
|'delete'|'DELETE'
|'options'|'OPTIONS'
|'head'|'HEAD'
|'put'|'PUT'
|'patch'|'PATCH'

export interface RequestConfig {
  url:string
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
