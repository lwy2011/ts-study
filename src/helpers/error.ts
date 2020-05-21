import {AxiosResponse, RequestConfig} from "../types";


export class AxiosError extends Error {
  config: RequestConfig;
  isAxiosError: boolean;
  request?: XMLHttpRequest;
  response?: AxiosResponse;
  code?: string | null;

  constructor(
    msg: string,
    config: RequestConfig,
    isAxiosError: boolean,
    request?: XMLHttpRequest,
    response?: AxiosResponse,
    code?: string | null
  ) {
    super(msg);
    this.config = config;
    this.request = request;
    this.response = response;
    this.code = code;
    this.isAxiosError = isAxiosError;
  }
}

export function createError(
  msg: string,
  config: RequestConfig,
  isAxiosError: boolean,
  request?: XMLHttpRequest,
  response?: AxiosResponse,
  code?: string | null
) {
  return new AxiosError(msg, config, isAxiosError, request, response, code);
}
