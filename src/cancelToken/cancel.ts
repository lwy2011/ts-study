export class Cancel {
  message?: string;

  constructor(message?: string) {
    this.message = message;
  }
}

export function isCancel(data:any):boolean {
  return data instanceof Cancel;
}
