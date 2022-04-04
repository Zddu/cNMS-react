import { Card, Col, Row, Select } from 'antd';
import React, { useState } from 'react';
import Adapter from './adapter';
import Application from './application';
import Basic from './basic';
import Disk from './disk';
import Process from './process';
import Quality from './quality';
import Services from './services';
const { Option, OptGroup } = Select;

const tabListNoTitle = [
  {
    key: 'basic',
    tab: '基础信息',
  },
  {
    key: 'quality',
    tab: '性能信息',
  },
  {
    key: 'disk',
    tab: '磁盘信息',
  },
  {
    key: 'process',
    tab: '进程信息',
  },
  {
    key: 'adapter',
    tab: '网卡信息',
  },
  {
    key: 'services',
    tab: '服务信息',
  },
  {
    key: 'application',
    tab: '应用信息',
  },
  {
    key: 'alarm',
    tab: '告警信息',
  },
  {
    key: 'log',
    tab: '日志信息',
  },
];

const Server = () => {
  const [activeTabKey, setActiveTabKey] = useState('basic');

  const handleChange = () => {
    console.log('handleChange');
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const contentListNoTitle = {
    basic: <Basic />,
    quality: <Quality />,
    disk: <Disk />,
    process: <Process />,
    adapter: <Adapter />,
    services: <Services />,
    application: <Application />,
    alarm: <p>告警信息</p>,
    log: <p>日志信息</p>,
  };
  return (
    <div className="server">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          选择设备：
          <Select defaultValue="zddv-1.1.1.1" style={{ width: 200 }} onChange={handleChange}>
            <OptGroup label="服务器">
              <Option value="12346">zddv-1.1.1.1</Option>
              <Option value="456">v1-1.2.1.1</Option>
            </OptGroup>
            <OptGroup label="网络设备">
              <Option value="12332">R2-192.168.1.1</Option>
            </OptGroup>
          </Select>
        </Col>
        <Col span={24}>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            onTabChange={key => {
              onTabChange(key);
            }}
          >
            {contentListNoTitle[activeTabKey]}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Server;
