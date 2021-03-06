/**
 * Created by xuejian.xu on 2017/10/30.
 */

import { createActions } from 'redux-actions';
import {
  GET_STOCK_DATA,
  UPDATE_BUY_PRICES_INDEX,
  UPDATE_STOP_LOSS_RATES_INDEX,
  UPDATE_PROTOCOL_STATUS,
  GET_STOCK_SUGGEST,
  UPDATE_CURRENT_STOCK_CODE,
  GET_FORBIDDEN_LIST
} from './contants';
import { URL_STOCK_DATA, URL_SUGGEST, URL_GET_FORBIDDEN_LIST } from '../../../../utils/urls';
import { notification } from 'antd';

const reducer = createActions({
  [GET_STOCK_DATA]: async code => {
    const res = await axios.get(URL_STOCK_DATA, {
      params: {
        gid: code,
        key: CONFIG.appKey
      }
    });

    if (res.resultcode == 200) {
      return res.result[0];
    } else {
      notification.error({
        message: '股票代码不存在，请重新输入'
      });

      return false;
    }
  },
  [UPDATE_BUY_PRICES_INDEX]: nextIndex => nextIndex,
  [UPDATE_STOP_LOSS_RATES_INDEX]: nextIndex => nextIndex,
  [UPDATE_PROTOCOL_STATUS]: status => status,
  [GET_STOCK_SUGGEST]: async queryStr => {
    if (!queryStr) {
      return [];
    }

    const res = await axios.get(URL_SUGGEST + queryStr);
    const resStr = res.match(/\".+\"/)[0].slice(1, -1);

    return resStr.split(';');
  },
  [UPDATE_CURRENT_STOCK_CODE]: stockCode => stockCode,
  [GET_FORBIDDEN_LIST]: async ()=>{
    const res = axios.get(URL_GET_FORBIDDEN_LIST, {
      params: {
        reason_id: 0
      }
    });

    return res;
  }
});

export default reducer;
