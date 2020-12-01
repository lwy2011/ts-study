import axios from "../../src";
import "nprogress/nprogress.css";
import Nprogress from "nprogress";




document.querySelector(".upload")!.addEventListener(
  "click", () => {
    axios('/more/auth',{
      auth:{
        username:'liu',password:'123456'
      },
      methods:'post'
    })
  }
);
document.querySelector(".upload1")!.addEventListener(
  "click", () => {
    axios('/more/auth',{
      auth:{
        username:'liu1',password:'123456'
      },
      methods:'post'
    })
  }
);

