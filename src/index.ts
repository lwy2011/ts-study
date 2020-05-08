import {RequireConfig} from "./types";
import xml from "./xml";

const axios = (config: RequireConfig):void => {
  xml(config);
};

export default axios;
