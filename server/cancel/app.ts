import axios from "../../src";
import qs from "qs";
import {AxiosTransform, Canceler} from "../../src/types";

const CancelToken = axios.cancelToken;
const source = CancelToken.source();

axios.get(
  "/cancel/get",
  {
    cancelToken: source.token
  }
).catch(
  e => {
    if (axios.isCancel(e)) {
      console.log("get canceled! ", e.message,1);
    }
  }
);

setTimeout(
  () => {
    source.cancel("Post Request canceled !!");
    axios.post("/cancel/post", {
      a: 2
    }, {
      cancelToken: source.token
    }).catch(
      e => {
        if (axios.isCancel(e)) {
          console.log("post canceled!", e.message,2);
        }
      }
    );
  }, 100
);


let cancel: Canceler;
axios.get("/cancel/get", {
  cancelToken: new CancelToken(c => {
    cancel = c;
  })
}).catch(
  e => {
    if (axios.isCancel(e)) {
      console.log("request canceled!",3);
    }
  }
);
setTimeout(
  () => {
    cancel();
  }, 200
);
