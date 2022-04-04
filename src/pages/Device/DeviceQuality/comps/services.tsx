import { getServicesData, GetServicesInfoProps, TcpConnItemProps } from '@/api/device/device';
import { Col, Row, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useEffect, useState } from 'react';

const tcpColumns = [
  {
    title: '本地地址',
    dataIndex: 'local_address',
    key: 'local_address',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '本地端口',
    dataIndex: 'local_port',
    key: 'local_port',
  },
  {
    title: '连接状态',
    dataIndex: 'tcp_conn_state',
    key: 'tcp_conn_state',
    render: (tcp_conn_state: string) => (
      <>
        <Tag color={tcp_conn_state === 'established' ? '#87d068' : '#2db7f5'} key={tcp_conn_state}>
          {tcp_conn_state}
        </Tag>
      </>
    ),
  },
  {
    title: '对端地址',
    dataIndex: 'remote_address',
    key: 'remote_address',
  },
  {
    title: '对端端口',
    dataIndex: 'remote_port',
    key: 'remote_port',
  },
  {
    title: '更新时间',
    dataIndex: 'last_polled',
    key: 'last_polled',
    width: 220,
    render: (last_polled: Date) => <a>{dayjs(last_polled).format('YYYY-MM-DD HH:mm:ss')}</a>,
  },
];

const udpColumns = [
  {
    title: '本地地址',
    dataIndex: 'local_address',
    key: 'local_address',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '本地端口',
    dataIndex: 'local_port',
    key: 'local_port',
  },
  {
    title: '更新时间',
    dataIndex: 'last_polled',
    key: 'last_polled',
    width: 220,
    render: (last_polled: Date) => <a>{dayjs(last_polled).format('YYYY-MM-DD HH:mm:ss')}</a>,
  },
];
const Services = () => {
  const [services, setServices] = useState<GetServicesInfoProps>();
  useEffect(() => {
    const loadServicesData = async () => {
      const { data } = await getServicesData('27e88b651bbb9821bdb25161900e360a');
      setServices(data);
    };

    loadServicesData();
  }, []);
  return (
    <div className="services">
      <Row gutter={16}>
        <Col span={24}>
          <h3 className="title">TCP连接</h3>
          <Table columns={tcpColumns} dataSource={services?.tcpTable} />
        </Col>
        <Col span={24}>
          <h3 className="title">UDP连接</h3>
          <Table columns={udpColumns} dataSource={services?.udpTable} />
        </Col>
      </Row>
    </div>
  );
};

export default Services;
