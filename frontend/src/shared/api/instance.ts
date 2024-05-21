 import axios, { AxiosResponse } from 'axios';
import Axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = axios.create();

 export const customInstance = <T>(
   config: AxiosRequestConfig,
   options?: AxiosRequestConfig,
 ): Promise<AxiosResponse<T>> => {
   const source = Axios.CancelToken.source();
   const promise = AXIOS_INSTANCE<T>({
     ...config,
     ...options,
     cancelToken: source.token,
   })
  // @ts-expect-error TODO: fix it
   promise.cancel = () => {
     source.cancel('Query was cancelled');
   };

   return promise;
 };

