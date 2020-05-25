import {Canceler, CancelExecutor, CancelTokenSource} from "../types";

interface ResolvePromise {
  (reason?: string): void
}

export class CancelToken {
  promise: Promise<string>;
  reason?: string;

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise;
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve;
    });

    executor(msg => {
      if (this.reason) return;
      this.reason = msg;
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
}
