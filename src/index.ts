import {Axios} from "./core/axios";
import {extend} from "./helpers/util";
import { AxiosStatic, RequestConfig} from "./types";
import {defaultConfig} from "./core/defaultConfig";
import {mergeConfig} from "./core/mergeConfig";


function createInstance(defaultConfig: RequestConfig): AxiosStatic {
  const Context = new Axios(defaultConfig);
  const axios = Context.request.bind(Context);
  extend(axios, Context);
  return axios as AxiosStatic;
}

const axios = createInstance(defaultConfig);
axios.create = function create(config) {
  return createInstance(mergeConfig(defaultConfig, config));
};

export default axios;
