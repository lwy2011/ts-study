import {encode, isDate, isPlainObject, isURLSearchParams} from "./util";

const makeURL = (url: string, params?: any,paramsSerializer?:(params:any)=>string): string => {
  const parts: string[] = [];
  let serializedParams;
  if (params){
    if (!paramsSerializer){
      if (isURLSearchParams(params)) { serializedParams = params.toString();}
      else {
        Object.keys(params).map(
          key => {
            const val = params[key];
            if (val === null || val === undefined) return;
            let values = [];
            if (Array.isArray(val)) {
              key += "[]";
              values = val;
            } else {
              values.push(val);
            }
            values.map(
              val => {
                if (isDate(val)) {
                  val = val.toISOString();
                } else if (isPlainObject(val)) {
                  val = JSON.stringify(val);
                }
                parts.push(`${encode(key)}=${encode(val)}`);
              }
            );
          }
        );
        serializedParams = parts.join("&");
      }
    }else{
      serializedParams = paramsSerializer(params)
    }
  }

  if (serializedParams) {
    const markIndex = url.indexOf("#");
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf("?") >= 0 ? "&" : "?") + serializedParams;
  }
  return url;
};

export default makeURL;

interface URLOrigin {
  host: string
  protocol: string
}

export function isURLSameOrigin(url: string): boolean {
  const currentOrigin = resolveURL(window.location.href);
  const parsedOrigin = resolveURL(url);
  return currentOrigin.host === parsedOrigin.host &&
    currentOrigin.protocol === parsedOrigin.protocol;
}

const urlParsingNode = document.createElement("a");

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute("href", url);
  const {protocol, host} = urlParsingNode;
  return {
    protocol, host
  };
}
