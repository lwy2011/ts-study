import {isPlainObject} from "./util";


const transformReqData = (data: any) => {
  if (isPlainObject(data)) {
    data = JSON.stringify(data);
  }
  return data;
};
export default transformReqData;
