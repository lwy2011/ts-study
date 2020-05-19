import {RequireConfig} from "./types";

const xml = (
  {
    url,
    methods = "GET",
    data = null,
    headers
  }: RequireConfig): void => {
  const request = new XMLHttpRequest();
  request.open(methods.toUpperCase(), url, true);
  headers && Object.keys(headers).map(
    key => {
      if (key.toUpperCase() === "Content-Type" && !data)
        return delete headers[key];
      request.setRequestHeader(key, headers[key]);
    }
  );
  request.send(data);
};
export default xml;
