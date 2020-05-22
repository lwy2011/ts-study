import {RejectFn, ResolveFn} from "../types";

export interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}


export class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[];

  constructor() {
    this.interceptors = [];
  }

  use(resolved: ResolveFn<T>, rejected?: RejectFn) {
    this.interceptors.push({resolved, rejected});
    return this.interceptors.length - 1;
  }

  eject(id: number): void {
    this.interceptors[id]&&
    (this.interceptors[id] = null);
  }

  forEach(f: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.map(
      val => {
        val!==null && f(val);
      }
    );
  }
}
