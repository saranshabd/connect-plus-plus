import { encryptStr, decryptStr } from '../Utils/string';
import { isEmptyString } from '../Utils/string';

export const registerUseraccesstoken = useraccesstoken => {
  localStorage.setItem('useraccesstoken', encryptStr(useraccesstoken));
};

export const getUserAccessToken = () => {
  let useraccesstoken = localStorage.getItem('useraccesstoken');
  if (isEmptyString(useraccesstoken)) return null;

  try {
    useraccesstoken = decryptStr(useraccesstoken);
  } catch (e) {
    return null;
  }

  return useraccesstoken;
};

export const removeUserAccessToken = () => {
  localStorage.removeItem('useraccesstoken');
};
