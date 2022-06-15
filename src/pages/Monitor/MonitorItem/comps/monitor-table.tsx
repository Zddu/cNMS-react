import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Progress } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MonitorItemProps } from '../index.type';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MonitorContext } from '../monitor-context';
import { deleteMonitorItem, getMonitorList, GetMonitorProps } from '@/api/monitor/monitor';

const columns: ProColumns<MonitorItemProps>[] = [
  {
    title: '监控名称',
    dataIndex: 'mission_name',
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
    width: 200,
    dataIndex: 'monitor_health',
    render: () => (
      <>
        <Progress percent={50} status="active" />
      </>
    ),
  },
  {
    title: <>创建时间</>,
    key: 'create_time',
    dataIndex: 'create_time',
    valueType: 'dateTime',
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: (_, record, __, action) => [
      <Button key="disabled">禁用</Button>,
      <Button key="edit">编辑</Button>,
      <Button
        type="link"
        danger
        onClick={async () => {
          // todo
          if (record.mission_id) {
            await deleteMonitorItem(record.mission_id);
            if (action && action.reloadAndRest) {
              await action.reloadAndRest();
            }
          }
        }}
      >
        删除
      </Button>,
    ],
  },
];

const MonitorTable = () => {
  const { setOpenNew, openNew } = useContext(MonitorContext) || {};
  const [params, setParams] = useState<Partial<GetMonitorProps>>({ current: 1, pageSize: 20 });
  const tableRef = useRef<ActionType>();

  const request = async (param: GetMonitorProps) => {
    const { data } = await getMonitorList(param);
    return {
      success: true,
      data: data,
    };
  };
  useEffect(() => {
    console.log('openNew', openNew);
    if (!openNew) {
      setParams({ current: 1, pageSize: 20 });
      tableRef.current?.reload();
    }
  }, [openNew]);
  return (
    <ProTable<MonitorItemProps>
      actionRef={tableRef}
      columns={columns}
      request={request}
      params={params}
      rowKey="mission_id"
      pagination={{
        showQuickJumper: true,
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
