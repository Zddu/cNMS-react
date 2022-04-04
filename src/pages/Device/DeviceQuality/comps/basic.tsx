import { Col, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

const Basic = () => {
  const [a, setA] = useState('');
  useEffect(() => {
    setA('1');
  }, []);
  return (
    <div className="basic">
      <Row gutter={[16, 16]}>
        <Col span={24} className="basic-wrapper">
          <span className="basic-title">基础信息</span>
          <ul className="ul-list">
            <li>IP地址：192.168.1.1</li>
            <li>主机名：Zdde</li>
            <li>系统类型：Linux</li>
            <li>设备品牌：DELL</li>
            <li>设备型号：ZQ-1212</li>
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
                <li>SNMP端口：161</li>
                <li>SNMP版本：V2C</li>
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
