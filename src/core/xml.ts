import {AxiosPromise, AxiosResponse, RequestConfig} from "../types";
import {processResponseHeaders} from "../helpers/headers";
import {createError} from "../helpers/error";
import {isURLSameOrigin} from "../helpers/url";
import cookie from "../helpers/cookie";
import {isFormData} from "../helpers/util";

const xml = (
  {
    url,
    methods = "GET",
    data = null,
    headers,
    responseType,
    timeout,
    transformRequest,
    transformResponse,
    cancelToken,
    withCredentials,

    xsrfCookieName,
    xsrfHeaderName,

    onDownloadProgress,
    onUploadProgress

  }: RequestConfig): AxiosPromise => {
  // @ts-ignore
  const config = arguments[0];

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();


    request.open(methods.toUpperCase(), url!, true);

    processRequest();
    processHeaders();
    processEvents();


    if (cancelToken) {   //除了dispatchRequest那里的防抖，
      // 这里做了预留cancel的接口！，这是Promise的pending状态改变之后，要执行的then的内容！
      //也就是对外只暴露Promise的resolve方法，这个可以进入resolve状态的方法！
      cancelToken.promise.then(reason => {
        request.abort();
        reject(reason);
      });
    }

    request.send(data);

    function processRequest() {
      if (responseType) {
        request.responseType = responseType;
      }
      if (timeout) {
        request.timeout = timeout;
      }

      if (withCredentials) {
        request.withCredentials = withCredentials;   //跨区请求发送时，设置发送请求，携带跨域站点的cookie！
      }
    }

    function processHeaders() {
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }
      if (isFormData(data)) {
        delete headers["Content-Type"];
        delete headers["content-type"];
      }
      headers && Object.keys(headers).map(
        key => {
          if (key.toUpperCase() === "Content-Type" && !data)
            return delete headers[key];
          request.setRequestHeader(key, headers[key]);
        }
      );
    }

    function processEvents() {
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


      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }
    }

  });
};
export default xml;
