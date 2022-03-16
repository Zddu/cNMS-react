import { Col, Divider, Form, Input, Row, Select } from 'antd';
import React from 'react';
const { Option } = Select;

const BasicConfig = () => {
  return (
    <div key="basic-config">
      <Divider orientation="left" plain>
        设备基本信息
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="设备IP地址" name="ip" rules={[{ required: true, message: 'IP地址为必填项' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="设备别名" name="alias_name">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" plain>
        SNMP配置信息
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="community" name="community" rules={[{ required: true, message: 'community为必填项' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item tooltip="默认为161" label="port" name="port">
            <Input defaultValue={161} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item tooltip="默认为162" label="trap port" name="trap_port">
            <Input defaultValue={162} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item tooltip="默认为v2c" label="SNMP版本" name="snmpver">
            <Select
              defaultValue="v2c"
              onChange={item => {
                console.log('item', item);
              }}
            >
              <Option value="1">1</Option>
              <Option value="v2c">v2c</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" plain>
        SSH/Telnet配置信息
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="SSH密码" name="ssh_password">
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="telnet密码" name="tel_password">
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicConfig;
