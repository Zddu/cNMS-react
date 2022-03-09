import React, { FC, useEffect, useRef, useState } from 'react';
import './index.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import { getAllDevice, getDefaultConfig, PollType } from '@/api/device/device';
import { Button, Col, Divider, Form, FormInstance, Input, Modal, Row, Select, Steps, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Step } = Steps;

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

const BasicConfig = () => {
  return (
    <>
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
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item tooltip="默认为162" label="trap port" name="trap_port">
            <Input />
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
    </>
  );
};

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
          <Form.Item label="开启状态" name="interface-enabled">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={poll_item.physics.enabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="轮询周期" name="interface-poll_cron" rules={[{ required: true, message: '轮询周期为必填项' }]}>
            <Input defaultValue={poll_item.physics.poll_cron} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

const steps = [
  {
    title: '基本配置',
    content: () => <BasicConfig />,
  },
  {
    title: '高级配置',
    content: (config: PollType) => <AdvanceConfig {...config} />,
  },
];

const DeviceView = () => {
  const [key, setKey] = useState('1');
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<PollType>();
  const formRef = useRef<FormInstance>(null);
  const onSelect = (keys: React.Key[], info: any) => {
    setKey(keys[0] as string);
  };

  const next = () => {
    console.log('下一步', formRef.current?.getFieldsValue());
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    const loadConfig = async () => {
      const { data } = await getDefaultConfig();
      setConfig(data.poll);
    };
    loadConfig();
  }, []);

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
              <DirectoryTree defaultExpandAll onSelect={onSelect} treeData={treeData} />
            </div>
            <div className="device-table">{dom}</div>
          </div>
        )}
        params={{
          key,
        }}
        toolBarRender={() => [
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined />
            添加新设备
          </Button>,
        ]}
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

      <Modal
        width="60%"
        visible={visible}
        title="添加新设备"
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              console.log('取消');
              setVisible(false);
            }}
          >
            取消
          </Button>,
          <>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                下一步
              </Button>
            )}

            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                上一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                htmlType="submit"
                key="submit"
                type="primary"
                onClick={() => {
                  console.log('提交', formRef.current?.getFieldsValue());
                  console.log;
                  setVisible(false);
                }}
              >
                提交
              </Button>
            )}
          </>,
        ]}
      >
        <div className="device-view-form">
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} children={item.content} />
            ))}
          </Steps>
          <Form className="advance-config" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} name="add-device" ref={formRef} autoComplete="off">
            {steps[current].content(config as PollType)}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default DeviceView;
