import {Canceler, CancelExecutor, CancelTokenSource} from "../types";
import {Cancel} from "./cancel";

interface ResolvePromise {
  (reason?: Cancel): void
}

export class CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise;
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve;
    });

    executor(msg => {
      if (this.reason) return;
      this.reason = new Cancel(msg)
      resolvePromise(this.reason);
    });
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler;
    const token = new CancelToken(c => {
      cancel = c;
    });
    return {
      cancel, token
    };
  }
  throwIfRequested(){
    if (this.reason){
      throw this.reason
    }
  }
}
