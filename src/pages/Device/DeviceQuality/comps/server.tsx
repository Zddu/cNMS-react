import { getAllDevice, GetDevicesProps } from '@/api/device/device';
import { Dispatch } from '@/store';
import { Card, Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  // {
  //   key: 'alarm',
  //   tab: '告警信息',
  // },
  // {
  //   key: 'log',
  //   tab: '日志信息',
  // },
];

const Server = () => {
  const [activeTabKey, setActiveTabKey] = useState('basic');
  const [servers, setServers] = useState<GetDevicesProps[]>();
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    getDevices();
  }, []);
  const getDevices = async () => {
    const { data } = await getAllDevice({ current: 1, pageSize: 100 });
    setServers(data);

    if (data?.[0].device_id) {
      dispatch.app.setDeviceId(data?.[0].device_id);
    }
  };

  const handleChange = (val: string) => {
    console.log('handleChange', val);
    dispatch.app.setDeviceId(val);
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
    // alarm: <p>告警信息</p>,
    // log: <p>日志信息</p>,
  };
  return (
    <div className="server">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          选择设备：
          {servers && (
            <Select defaultValue={servers?.[0].device_id} style={{ width: 200 }} onChange={handleChange}>
              <OptGroup label="服务器">
                {servers?.map(server => (
                  <Option key={server.ip} value={server.device_id}>
                    {server.hostname}-{server.ip}
                  </Option>
                ))}
              </OptGroup>
              <OptGroup label="网络设备"></OptGroup>
            </Select>
          )}
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
