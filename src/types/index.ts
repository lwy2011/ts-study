type Methods = 'get' | 'GET'
|'post'|'POST'
|'delete'|'DELETE'
|'options'|'OPTIONS'
|'head'|'HEAD'
|'put'|'PUT'
|'patch'|'PATCH'

export interface RequireConfig {
  url:string
  methods?:Methods
  data?:any
  params?:any
  headers?:any
}

