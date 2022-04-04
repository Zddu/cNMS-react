import { getApplicationData, GetApplicationInfoProps } from '@/api/device/device';
import { Col, Row, Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '软件名称',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '安装时间',
    dataIndex: 'datetime',
    key: 'datetime',
  },
  {
    title: '更新时间',
    dataIndex: 'last_polled',
    key: 'last_polled',
    width: 220,
    render: (last_polled: Date) => <a>{dayjs(last_polled).format('YYYY-MM-DD HH:mm:ss')}</a>,
  },
];
const Application = () => {
  const [apps, setApps] = useState<GetApplicationInfoProps[]>();
  useEffect(() => {
    loadAppsData();
  }, []);

  const loadAppsData = async () => {
    const { data } = await getApplicationData('1753848ccaba6cff28beea4e512fb83b');
    setApps(data);
  };
  return (
    <div className="applicaiton">
      <Row gutter={16}>
        <Col span={24}>
          <Table columns={columns} dataSource={apps} />
        </Col>
      </Row>
    </div>
  );
};

export default Application;
