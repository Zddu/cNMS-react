import { merge } from 'lodash';
import { useRef, useState, useEffect, SetStateAction } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import tools from './tools';

export const useWebsocket = ({ url }: { url: string }) => {
  const ws = useRef<WebSocket>();
  const [wsData, setMessage] = useState('');
  const [readyState, setReadyState] = useState({ key: 0, value: '正在链接中' });

  const creatWebSocket = () => {
    const stateArr = [
      { key: 0, value: '正在链接中' },
      { key: 1, value: '已经链接并且可以通讯' },
      { key: 2, value: '连接正在关闭' },
      { key: 3, value: '连接已关闭或者没有链接成功' },
    ];
    try {
      ws.current = new WebSocket(url);
      ws.current.onopen = (_e: any) => setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onclose = () => {
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };
      ws.current.onerror = () => {
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };

      ws.current.onmessage = (e: { data: SetStateAction<string> }) => {
        setMessage(e.data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const webSocketInit = () => {
    if (!ws.current || ws.current.readyState === 3) {
      creatWebSocket();
    }
  };

  //  关闭 WebSocket
  const closeWebSocket = () => {
    ws.current?.close();
  };

  const reconnect = () => {
    try {
      closeWebSocket();
      ws.current = undefined;
      creatWebSocket();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    webSocketInit();
    return () => {
      ws.current?.close();
    };
  }, [ws]);

  return {
    ws: ws.current,
    wsData,
    readyState,
    closeWebSocket,
    reconnect,
  };
};

export function useQuery() {
  const params: { [x: string]: string | undefined } = {};
  merge(params, tools.urlParamsToObject(useLocation().search), tools.urlParamsToObject(useParams<{ params: string }>().params));
  return params;
}
