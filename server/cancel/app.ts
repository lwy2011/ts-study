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
    source.cancel("Post Request canceled !!");  //这里是终止上面的那个请求的操作，
    // 只不过是改变了Promise的pending状态，所以是异步的，需要下面的同步的请求终止后，才执行！
    axios.post("/cancel/post", {
      a: 2
    }, {
      cancelToken: source.token    //这里引用了上面的source，上面的source.cancel执行了，
      // 会在一开始执行throwIfRequested方法，终止请求！
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
