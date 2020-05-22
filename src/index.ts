import {Axios} from "./core/axios";
import {extend} from "./helpers/util";
import {AxiosInstance, AxiosPromise} from "./types";


function createInstance(): AxiosInstance {
  const Context = new Axios();
  const axios = Context.request.bind(Axios);
  return extend(axios, Context);
}

const axios = createInstance();

export default axios;
