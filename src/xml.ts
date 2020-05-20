import {AxiosPromise, RequestConfig} from "./types";
import {processResponseHeaders} from "./helpers/headers";

const xml = (
  {
    url,
    methods = "GET",
    data = null,
    headers,
    responseType
  }: RequestConfig): AxiosPromise => {
  const config = arguments[0]
  return new Promise(resolve => {
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      const headers = processResponseHeaders(request.getAllResponseHeaders()),
        data = responseType === "text" ? request.responseText : request.response,
        response = {
          data,
          headers,
          status: request.status,
          statusText: request.statusText,
          config,
          request
        };
      resolve(response);
    };

    request.open(methods.toUpperCase(), url, true);
    headers && Object.keys(headers).map(
      key => {
        if (key.toUpperCase() === "Content-Type" && !data)
          return delete headers[key];
        request.setRequestHeader(key, headers[key]);
      }
    );
    request.send(data);

  });
};
export default xml;
