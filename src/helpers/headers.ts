import {deepMerge, isPlainObject} from "./util";
import {Methods} from "../types";

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
export const processResponseHeaders = (str: string) => {
  const headers = Object.create(null);
  str.split("\r\n").map(
    line => {
      let [key, val] = line.split(":");
      key = key.trim().toLowerCase();
      if (!key) return;
      if (val) {
        val = val.trim();
      }
      headers[key] = val;
    }
  );
  return headers;
};
export default processHeaders;

export function flattenHeaders(headers: any, methods: Methods): any {
  if (!headers) return headers;
  headers = deepMerge(headers.common, headers[methods], headers);
  const methodsToDelete = [
    "delete", "get", "post", "put", "options", "head", "patch", "common"
  ];
  methodsToDelete.map(
    key => {
      delete headers[key];
    }
  );
  return headers;
}
