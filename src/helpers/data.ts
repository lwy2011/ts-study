import {isPlainObject} from "./util";


const transformReqData = (data: any) => {
  if (isPlainObject(data)) {
    data = JSON.stringify(data);
  }
  return data;
};
export const transformResData = (data: any):any => {
  if (typeof data === 'string'){
    try {
      data = JSON.parse(data)
    }catch (e) {

    }
  }
  return data
};
export default transformReqData;
