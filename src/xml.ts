import {AxiosPromise, AxiosResponse, RequestConfig} from "./types";
import {processResponseHeaders} from "./helpers/headers";

const xml = (
  {
    url,
    methods = "GET",
    data = null,
    headers,
    responseType,
    timeout
  }: RequestConfig): AxiosPromise => {
  const config = arguments[0];
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }
    if (timeout) {
      request.timeout = timeout;
    }

    function processFailedStatus(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) return resolve(response);
      reject(new Error(`axios failed with status code ${response.status}!`));
    }

    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      if (request.status === 0) return;  //网络错误或者超时错误，为0
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
      processFailedStatus(response);
    };

    request.onerror = () => {
      reject(new Error("Network Error!"));
    };
    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded!`));
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
