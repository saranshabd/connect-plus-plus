import axios from 'axios';

import { encryptStr, decryptStr } from '../../Utils/string';

// import redux action types
import { CACHE_ALL_USERS } from '../reducerTypes/search';

export const cacheAllUsers = useraccesstoken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_SERVER_URL}/search/text-match/get-all`,
        {
          params: {
            token: decryptStr(useraccesstoken)
          }
        }
      )
      .then(result => {
        dispatch({
          type: CACHE_ALL_USERS,
          payload: encryptStr(JSON.stringify(result.data))
        });
        resolve();
      })
      .catch(error => {
        reject();
      });
  });
};
