import React, { useState } from 'react';
import './index.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import { getAllDevice } from '@/api/device/device';

const DEVICE_TYPE = {
  host: '服务器',
  'general switch': '二层交换机',
  'multifunctional switch': '三层交换机',
  router: '路由器',
};

export type TableListItem = {
  key: number;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    key: 'index',
    width: 60,
    hideInSearch: true,
  },
  {
    title: '别名',
    dataIndex: 'alias_name',
  },
  {
    title: '主机名称',
    dataIndex: 'hostname',
    render: (text: string) => <a href="#">{text}</a>,
    hideInSearch: true,
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
  },
  {
    title: '系统',
    dataIndex: 'os',
  },
  {
    title: '类型',
    dataIndex: 'type',
    valueEnum: DEVICE_TYPE,
  },
  {
    title: '运行时长',
    dataIndex: 'uptime',
    hideInSearch: true,
  },

  {
    title: '更新时间',
    dataIndex: 'last_polled',
    valueType: 'dateTime',
    hideInSearch: true,
  },
];

const treeData = [
  {
    title: '北校区',
    key: '0',
    children: [
      { title: '服务器', key: '0-1', isLeaf: true },
      { title: '路由器', key: '0-2', isLeaf: true },
      { title: '交换机', key: '0-3', isLeaf: true },
      { title: '防火墙', key: '0-4', isLeaf: true },
    ],
  },
  {
    title: '南校区',
    key: '1',
    children: [
      { title: '服务器', key: '1-1', isLeaf: true },
      { title: '路由器', key: '1-2', isLeaf: true },
      { title: '交换机', key: '1-3', isLeaf: true },
    ],
  },
];

const DeviceView = () => {
  const [key, setKey] = useState('1');
  const onSelect = (keys: React.Key[], info: any) => {
    setKey(keys[0] as string);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  return (
    <div className="device-view">
      <ProTable<TableListItem>
        columns={columns}
        rowKey="device_id"
        pagination={{
          showSizeChanger: true,
        }}
        tableRender={(_, dom) => (
          <div className="device-view-wrapper">
            <div className="device-tree">
              <DirectoryTree defaultExpandAll onSelect={onSelect} onExpand={onExpand} treeData={treeData} />
            </div>
            <div className="device-table">{dom}</div>
          </div>
        )}
        params={{
          key,
        }}
        request={async param => {
          console.log('param', param);
          const { data }: any = await getAllDevice();
          return {
            success: true,
            data: data,
          };
        }}
        dateFormatter="string"
      />
    </div>
  );
};

export default DeviceView;
