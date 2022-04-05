import React from 'react';
import './index.less';
import MonitorTable from './comps/monitor-table';
import CreateMonitor from './comps/create-monitor';
import HostList from './comps/host-list';
import { MonitorProvider } from './monitor-context';

const MonitorItem = () => {
  return (
    <MonitorProvider>
      <div className="monitor-item">
        <MonitorTable />
        <CreateMonitor />
        <HostList />
      </div>
    </MonitorProvider>
  );
};

export default MonitorItem;
