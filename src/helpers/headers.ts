import {isPlainObject} from "./util";

function normalizeHeaderName(headers: any, normalizeName: string) {
  if (headers) {
    Object.keys(headers).map(
      key => {
        if (key !== normalizeName &&
          normalizeName.toUpperCase() === key.toUpperCase()) {
          headers[normalizeName] = headers[key];
          delete headers[key];
        }
      }
    );
  }
}

const processHeaders = (headers: any, data: any) => {
  normalizeHeaderName(headers, "Content-Type");
  if (isPlainObject(data)) {
    headers["Content-Type"] = "application/json;charset=utf-8";
  }
  console.log(headers);
  return headers;
};

export default processHeaders;
