import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Checkbox, Col, Form, Input, Modal, Pagination, Progress, Radio, Row, Select, Steps, Table, Transfer } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MonitorItem } from '../index.type';
import React, { useContext } from 'react';
import { MonitorConext } from '../monitor-context';

const tableListDataSource: MonitorItem[] = [];

const columns: ProColumns<MonitorItem>[] = [
  {
    title: '监控名称',
    width: 80,
    dataIndex: 'monitor_name',
    render: _ => <a>{_}</a>,
  },
  {
    title: '类型',
    dataIndex: 'monitor_type',
    key: 'monitor_type',
  },
  {
    title: '频率',
    dataIndex: 'monitor_frequency',
    key: 'monitor_frequency',
  },
  {
    title: '状态',
    width: 80,
    dataIndex: 'monitor_status',
    initialValue: 'all',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '健康度',
    dataIndex: 'monitor_health',
    render: () => (
      <>
        <Progress percent={50} status="active" />
      </>
    ),
  },
  {
    title: <>创建时间</>,
    width: 140,
    key: 'create_time',
    dataIndex: 'create_time',
    valueType: 'date',
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <Button key="disabled">禁用</Button>,
      <Button key="edit">编辑</Button>,
      <Button type="link" danger>
        删除
      </Button>,
    ],
  },
];

const MonitorTable = () => {
  const { setOpenNew } = useContext(MonitorConext) || {};
  return (
    <ProTable<MonitorItem>
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        optionRender: false,
        collapsed: false,
      }}
      dateFormatter="string"
      headerTitle="监控任务"
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            setOpenNew?.(true);
          }}
        >
          <PlusCircleOutlined />
          创建监控项
        </Button>,
        <Button key="custom">
          <PlusCircleOutlined />
          自定义监控项
        </Button>,
      ]}
    />
  );
};

export default MonitorTable;
