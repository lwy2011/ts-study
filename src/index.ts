import {Axios} from "./core/axios";
import {extend} from "./helpers/util";
import {AxiosInstance, RequestConfig} from "./types";
import {defaultConfig} from "./core/defaultConfig";


function createInstance(defaultConfig:RequestConfig): AxiosInstance {
  const Context = new Axios(defaultConfig);
  const axios = Context.request.bind(Context);
  return extend(axios, Context) as AxiosInstance;
}

const axios = createInstance(defaultConfig);

export default axios;
