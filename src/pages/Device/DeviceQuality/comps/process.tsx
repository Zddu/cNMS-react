import { getProcessData, GetProcessInfoProps } from '@/api/device/device';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useEffect } from 'react';

const RunStatusColor = {
  runnable: '#108ee9',
  running: '#87d068',
  notRunnable: '#ffe58f',
  invalid: '#f50',
};

const RunTypeColor = {
  application: '#108ee9',
  deviceDriver: '#108ee9',
  operatingSystem: '#ffe58f',
  unknown: '#f50',
};

const columns = [
  {
    title: 'PID',
    dataIndex: 'pid',
    key: 'pid',
    render: (text: string) => <a>{text}</a>,
    sorter: (a: GetProcessInfoProps, b: GetProcessInfoProps) => a.pid - b.pid,
  },
  {
    title: '进程名称',
    dataIndex: 'processName',
    key: 'processName',
  },
  {
    title: '文件路径',
    dataIndex: 'processPath',
    key: 'processPath',
  },
  {
    title: '运行参数',
    key: 'runParameters',
    dataIndex: 'runParameters',
  },
  {
    title: '运行状态',
    key: 'runStatus',
    dataIndex: 'runStatus',
    render: (runStatus: string) => (
      <>
        <Tag color={RunStatusColor[runStatus]} key={runStatus}>
          {runStatus}
        </Tag>
      </>
    ),
  },
  {
    title: '进程类型',
    key: 'runType',
    dataIndex: 'runType',
    render: (runType: string) => (
      <>
        <Tag color={RunTypeColor[runType]} key={runType}>
          {runType}
        </Tag>
      </>
    ),
  },
  {
    title: '更新时间',
    key: 'last_polled',
    dataIndex: 'last_polled',
    render: (date: string) => <>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</>,
  },
];

const Process = () => {
  const [data, setData] = useState<GetProcessInfoProps[]>();
  useEffect(() => {
    const loadProcessData = async () => {
      const { data } = await getProcessData('27e88b651bbb9821bdb25161900e360a');
      console.log('data', data);
      setData(data);
    };

    loadProcessData();
  }, []);

  return (
    <div className="Process">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Process;
