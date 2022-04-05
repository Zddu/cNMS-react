import { treeData } from '@/pages/Device/DeviceView/index.type';
import { Col, Form, Input, Modal, Pagination, Row, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { HostColumnProps } from '../index.type';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import { getAllDevice } from '@/api/device/device';
import { MonitorConext } from '../monitor-context';

const hostColumns = [
  {
    title: '主机名称',
    dataIndex: 'hostname',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
];

const HostList = () => {
  const [Hosts, setHosts] = useState<HostColumnProps[]>();
  const [hostsChange, setHostsChange] = useState<React.Key[]>();
  const { hostVisible, setHostVisible, form } = useContext(MonitorConext) || {};

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  useEffect(() => {
    loadHostsData();
  }, []);

  const loadHostsData = async () => {
    const { data } = await getAllDevice(pagination);
    setHosts(data as HostColumnProps[]);
  };

  return (
    <Modal
      width="60%"
      visible={hostVisible}
      title="选择主机"
      okText="确认"
      cancelText="取消"
      onCancel={() => {
        setHostVisible?.(false);
      }}
      onOk={() => {
        if (hostsChange && form) {
          form.setFieldsValue({ monitor_hosts: hostsChange });
        }
        setHostVisible?.(false);
      }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={() => {
              console.log('select');
            }}
            treeData={treeData}
          />
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Input width={200} placeholder="输入搜索" />
            </Col>
            <Col span={24}>
              <Table
                rowKey="device_id"
                pagination={false}
                rowSelection={{
                  onChange: (selectedRowKeys: React.Key[]) => {
                    setHostsChange(selectedRowKeys);
                  },
                }}
                columns={hostColumns}
                dataSource={Hosts}
              />
            </Col>
            <Col span={24} offset={20}>
              <Pagination
                pageSize={pagination.pageSize}
                onChange={(page, pageSize) => {
                  setPagination({
                    current: page,
                    pageSize,
                  });
                }}
                defaultCurrent={1}
                total={Hosts?.length}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default HostList;
