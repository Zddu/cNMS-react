import { PollType } from '@/api/device/device';
import { Col, Divider, Form, Input, Row, Select, Switch } from 'antd';
import React, { FC } from 'react';
const { Option } = Select;

const AdvanceConfig: FC<PollType> = ({ enabled, poll_item }) => {
  return (
    <>
      <Divider orientation="left" plain>
        轮询配置
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="是否开启轮询" name="poll-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={enabled} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        CPU
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="开启状态" name="cpu-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={poll_item.cpu.enabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="轮询周期" name="cpu-poll_cron" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input defaultValue={poll_item.cpu.poll_cron} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        内存
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="开启状态" name="mem-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={poll_item.mem.enabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="轮询周期" name="mem-poll_cron" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input defaultValue={poll_item.mem.poll_cron} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        硬盘
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="开启状态" name="disk-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={poll_item.disk.enabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="轮询周期" name="disk-poll_cron" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input defaultValue={poll_item.disk.poll_cron} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        流量
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="开启状态" name="flow-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={poll_item.flow.enabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="轮询周期" name="flow-poll_cron" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input defaultValue={poll_item.flow.poll_cron} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item tooltip="计算X秒内的平均流量" label="平均时间" name="flow-average_time">
            <Input defaultValue={poll_item.flow.average_time.value} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item tooltip="数据保留小数位数" label="小数位数" name="flow-decimal" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input type="number" defaultValue={poll_item.flow.decimal.value} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item tooltip="单位" label="单位" name="flow-unit" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Select
              defaultValue={poll_item.flow.unit.value}
              onChange={item => {
                console.log('item', item);
              }}
            >
              {poll_item.flow.unit.list.map(item => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        接口
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="开启状态" name="interface-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={poll_item.interface.enabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="轮询周期" name="interface-poll_cron" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input defaultValue={poll_item.interface.poll_cron} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        主机信息
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="开启状态" name="physics-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={poll_item.physics.enabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="轮询周期" name="physics-poll_cron" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input defaultValue={poll_item.physics.poll_cron} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default AdvanceConfig;
