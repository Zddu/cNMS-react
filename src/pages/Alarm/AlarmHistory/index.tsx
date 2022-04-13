import { getAlarms, GetAlarmsProps } from '@/api/monitor/monitor';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Tag } from 'antd';
import React, { useState } from 'react';
import { AlarmHistoryItem } from './index.types';

const columns: ProColumns<AlarmHistoryItem>[] = [
  {
    title: '任务名称',
    dataIndex: 'mission_name',
    render: _ => <a>{_}</a>,
  },
  {
    title: '监控类型',
    dataIndex: 'monitor_type',
    width: 100,
    valueEnum: {
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
    valueEnum: {
      1: { text: '初始化中', status: 'Default' },
      2: { text: '巡检中', status: 'Processing' },
      3: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '持续时间（h）',
    dataIndex: 'alarm_continued',
    hideInSearch: true,
  },
  {
    title: '通知方式',
    dataIndex: 'alarm_inform_type',
    hideInSearch: true,
    render: (_, record) => {
      const types = JSON.parse(record.alarm_inform_type || '[]') as string[];
      return (
        <a>
          {types.map(type => (
            <Tag>{type}</Tag>
          ))}
        </a>
      );
    },
  },
  {
    title: '通知对象',
    dataIndex: 'alarm_inform_target',
    hideInSearch: true,
    render: (_, record) => {
      const targets = JSON.parse(record.alarm_inform_target || '[]') as string[];
      // const
      return (
        <a>
          {targets.map(item => (
            <Tag>{item}</Tag>
          ))}
        </a>
      );
    },
  },
  {
    title: '错误信息',
    dataIndex: 'error_info',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    hideInSearch: true,
    valueType: 'dateTime',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    hideInSearch: true,
    valueType: 'dateTime',
  },
];

const AlarmHistory = () => {
  const [params, setParams] = useState<GetAlarmsProps>();

  const request = async (param: GetAlarmsProps) => {
    const { data }: any = await getAlarms(param);
    return {
      success: true,
      data: data,
    };
  };
  return <ProTable<AlarmHistoryItem> params={params} request={request} columns={columns} headerTitle="告警历史" rowKey="alarm_id" />;
};

export default AlarmHistory;
