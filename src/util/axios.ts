/** 对axios做一些配置 **/

import { baseUrl } from '../config';
import axios, { AxiosRequestConfig, Method } from 'axios';
import tools from './tools';
import { merge } from 'lodash';
import { message } from 'antd';
const instance = axios.create({
  baseURL: 'http://82.157.237.245:80',
  timeout: 10000,
  withCredentials: false,
});
console.log('baseUrl', baseUrl);

export type IGetData = <T>(
  url: string,
  params?: { [x: string]: string | number | undefined } | any,
  options?: AxiosRequestConfig
) => Promise<{
  code: number;
  message: string;
  data: T;
}>;

export type LoadData = <T>(
  method: Method,
  params: RequestParams
) => Promise<{
  code: number;
  message: string;
  data: T;
}>;

export interface RequestParams {
  url: string;
  params?: { [x: string]: string | number | undefined } | any;
  options?: AxiosRequestConfig;
}

/**
 * 生成请求的 URL
 *
 * @param method 方法名
 * @param param1
 * @returns
 */
function generateRequestUrl(method: Method, { url, params }: RequestParams) {
  const query = {};
  if (method === 'get') {
    merge(query, params);
  }
  const converted = tools.objectToUrlParams(query);

  if (converted) {
    return `${url}${url.includes('?') ? '&' : '?'}${converted}`;
  }

  return url;
}

const loadData: LoadData = (method, { url, params, options }) => {
  const realUrl = generateRequestUrl(method, { url, params, options });

  const resPromise = instance({
    url: realUrl,
    method,
    data: params,
    ...(options || {}),
  });

  return new Promise((resolve, reject) => {
    (async function () {
      try {
        const res = await resPromise;
        if (Number(res.data.code) === 10000) {
          resolve(res.data);
        } else {
          message.error(res.data.message);
          reject(res.data);
        }
      } catch (error) {
        message.error('服务出小差，请重试～');
        reject(error);
      }
    })();
  });
};
axios.interceptors.response.use(response => {
  return response.data;
});

export const getData: IGetData = (url, params, options) => loadData('get', { url, params, options });
export const postData: IGetData = (url, params, options) => loadData('post', { url, params, options });
export const deleteData: IGetData = (url, params, options) => loadData('delete', { url, params, options });
export const putData: IGetData = (url, params, options) => loadData('put', { url, params, options });

export default axios;
