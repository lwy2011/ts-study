import {RequireConfig} from "./types";

const xml = (
  {
    url,
    methods = "GET",
    data = null
  }: RequireConfig):void => {
  const xml = new XMLHttpRequest();
  xml.open(methods.toUpperCase(), url, true);
  xml.send(data);
};
export default xml;
