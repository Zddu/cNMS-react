import ProTable from '@ant-design/pro-table';
import React from 'react';
import { AlarmHistoryItem } from './index.types';

const AlarmHistory = () => {
  return <ProTable<AlarmHistoryItem>></ProTable>;
};

export default AlarmHistory;
