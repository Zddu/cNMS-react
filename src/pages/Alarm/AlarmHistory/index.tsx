import ProTable, { ProColumns } from '@ant-design/pro-table';
import React from 'react';
import { AlarmHistoryItem } from './index.types';

const columns: ProColumns<AlarmHistoryItem>[] = [
  {
    title: '任务名称',
    dataIndex: 'monitor_name',
    render: _ => <a>{_}</a>,
  },
  {
    title: '监控类型',
    dataIndex: 'monitor_type',
    width: 100,
    valueEnum: {
      all: { text: '全部' },
      monitor_cpu: { text: 'CPU监控' },
    },
  },
  {
    title: '监控对象',
    dataIndex: 'monitor_host',
  },
  {
    title: '监控状态',
    dataIndex: 'alarm_status',
  },
  {
    title: '持续时间',
    dataIndex: 'alarm_continued',
    hideInSearch: true,
  },
  {
    title: '通知方式',
    dataIndex: 'alarm_inform_type',
    hideInSearch: true,
  },
  {
    title: '通知对象',
    dataIndex: 'alarm_inform_target',
    hideInSearch: true,
  },
  {
    title: '发生时间',
    dataIndex: 'create_time',
    hideInSearch: true,
  },
];

const AlarmHistory = () => {
  return <ProTable<AlarmHistoryItem> columns={columns} headerTitle="告警历史" rowKey="alarm_id" />;
};

export default AlarmHistory;
