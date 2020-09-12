import axios from "../../src";
import "nprogress/nprogress.css";
import Nprogress from "nprogress";

const instance = axios.create();

document.querySelector(".download")!.addEventListener(
  "click", () => {
    instance.get("https://img.mukewang.com/5cc01a7b0001a33718720632.jpg");
  }
);
document.querySelector(".upload")!.addEventListener(
  "click", () => {
    const data = new FormData();
    const input = document.querySelector(".input") as HTMLInputElement;
    if (input.files) {
      data.append("file", input.files[0]);
      instance.post("/more/upload", data);
    }
  }
);

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total;
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(
      config => {
        Nprogress.start();
        return config;
      }
    );
  };
  const setupStopProgress = () => {
    instance.interceptors.response.use(
      res => {
        Nprogress.done();
        return res;
      }, error => {
        Nprogress.done();
        return Promise.reject(error);
      }
    );
  };
  const setupUploadProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e);
      Nprogress.set(calculatePercentage(e.loaded, e.total));
    };
    instance.defaultConfig.onUploadProgress = update;
    instance.defaultConfig.onDownloadProgress = update;
  };
  setupStartProgress();
  setupUploadProgress();
  setupStopProgress();
}

loadProgressBar();
instance.post('/more/upload',{a:2})
