import {AxiosPromise, AxiosResponse, RequestConfig} from "../types";
import {processResponseHeaders} from "../helpers/headers";
import {createError} from "../helpers/error";

const xml = (
  {
    url,
    methods = "GET",
    data = null,
    headers,
    responseType,
    timeout,
    transformRequest,
    transformResponse
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
      reject(createError(
        `axios failed with status code ${response.status}!`,
        config,
        request,
        null,
        response
      ));
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
      reject(createError(
        "Network Error!",
        config,
        request
      ));
    };
    request.ontimeout = () => {
      reject(createError(
        `Timeout of ${timeout} ms exceeded!`,
        config,
        request,
        "ECONNABOUTED"
      ));
    };

    request.open(methods.toUpperCase(), url!, true);
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
