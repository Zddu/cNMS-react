import { useWebsocket } from '@/util/custom-hook';
import './index.less';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
require('xterm/css/xterm.css');

interface SSHProps {
  sshConfig: { ip?: string; device_id: string; port: number; username: string; password: string };
  reAuth?: (v: boolean) => void;
}

const SSH: FC<SSHProps> = ({ sshConfig, reAuth }) => {
  const { ws, wsData, readyState, closeWebSocket, reconnect } = useWebsocket({ url: `ws://localhost:3000/cool/ws/host` });
  const termRef = useRef<HTMLDivElement>(null);
  const [terminal] = useState<Terminal>(new Terminal());
  const fitAddon = new FitAddon();

  useEffect(() => {
    if (termRef.current) {
      terminal.open(termRef.current);
      terminal.loadAddon(fitAddon);
      terminal.focus();
      fitAddon.fit();
      terminal.options.cursorBlink = true;
      terminal.options.scrollback = 10000;
      terminal.options.tabStopWidth = 8;
      terminal.options.bellStyle = 'sound';
      terminal.onKey(({ domEvent }) => {
        // const code = key.charCodeAt(0);
        if (domEvent.code == 'Backspace') {
          //Backspace
          terminal.write('\b \b');
        }
      });
    }
  }, [termRef]);

  useEffect(() => {
    console.log('readyState', readyState);
    console.log('wsdata', wsData);
    if (readyState.key === 1) {
      if (wsData && terminal) {
        eventHandle(wsData);
      }
      ws?.send(JSON.stringify({ event: 'geometry', data: { cols: terminal.cols, rows: terminal.rows } }));
    }
    if (readyState.key === 3) {
      reconnect();
    }
  }, [wsData, readyState, closeWebSocket, reconnect]);

  useEffect(() => {
    if (ws && readyState.key === 1) {
      terminal.onData(data => {
        ws?.send(JSON.stringify({ event: 'data', data }));
      });

      window.addEventListener('resize', resizeScreen, false);
    }
  }, [ws, readyState]);

  useEffect(() => {
    if (ws && sshConfig && readyState.key === 1) {
      ws?.send(JSON.stringify({ event: 'auth', data: sshConfig }));
    }
  }, [sshConfig, ws, readyState]);

  function resizeScreen() {
    fitAddon.fit();
    ws?.send(JSON.stringify({ event: 'resize', data: { cols: terminal.cols, rows: terminal.rows } }));
  }

  function eventHandle(data: string) {
    const wsData = JSON.parse(data || '{}') as { event: string; data: string };
    switch (wsData.event) {
      case 'reauth':
        reAuth?.(true);
      case 'data':
        terminal.write(wsData.data);
    }
  }
  return <div className="terminal" ref={termRef}></div>;
};

export default SSH;
