import { getDevice, GetDeviceInfoProps } from '@/api/device/device';
import { RootState } from '@/store';
import { Col, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Basic = () => {
  const [device, setDevice] = useState<GetDeviceInfoProps>();
  const device_id = useSelector((state: RootState) => state.app.device_id);
  useEffect(() => {
    if (device_id) {
      getDeviceData(device_id);
    }
  }, [device_id]);

  const getDeviceData = async (device_id: string) => {
    const { data } = await getDevice(device_id);
    setDevice(data);
  };
  return (
    <div className="basic">
      <Row gutter={[16, 16]}>
        <Col span={24} className="basic-wrapper">
          <span className="basic-title">基础信息</span>
          <ul className="ul-list">
            <li>IP地址：{device?.device.ip}</li>
            <li>主机名：{device?.device.hostname}</li>
            <li>系统类型：{device?.device.os}</li>
            <li>设备品牌：{device?.device.os}</li>
            <li>
              <span className="baisc-text" title={device?.device.sysDescr}>
                设备型号：{device?.device.sysDescr}
              </span>
            </li>
            <li>运维联系人：李四</li>
            <li>运维联系电话：1888123456</li>
            <li>所在位置：天一楼</li>
          </ul>
        </Col>
        <div className="management">
          <span className="basic-title">管理信息</span>
          <div className="management-wrapper">
            <div className="management-item-wrapper">
              <span className="basic-title">SNMP信息</span>
              <ul className="ul-list management-item">
                <li>
                  SNMP状态：<Tag color="#87d068">正常</Tag>
                </li>
                <li>SNMP端口：{device?.device.port}</li>
                <li>SNMP版本：{device?.device.snmpver}</li>
              </ul>
            </div>
            <div className="management-item-wrapper">
              <span className="basic-title">SSH状态</span>
              <ul className="ul-list management-item">
                <li>
                  SSH状态：<Tag color="#87d068">正常</Tag>
                </li>
                <li>SSH用户：161</li>
                <li>SSH密码：******</li>
              </ul>
            </div>
            <div className="management-item-wrapper">
              <span className="basic-title">PING状态</span>
              <ul className="ul-list management-item">
                <li>
                  PING状态： <Tag color="#87d068">正常</Tag>
                </li>
                <li>PING延时：11ms</li>
                <li>PING丢包率：0%</li>
              </ul>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Basic;
