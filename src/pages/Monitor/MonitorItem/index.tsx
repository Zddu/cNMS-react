import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Checkbox, Col, Form, Input, Modal, Pagination, Progress, Radio, Row, Select, Steps, Table, Transfer } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
const { Step } = Steps;
const { Option } = Select;

import './index.less';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import { treeData } from '@/pages/Device/DeviceView/index.type';
import { AlarmModes, HostColumnProps, SlientList } from './index.type';
import { getAllDevice } from '@/api/device/device';
const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export type MonitorItem = {
  key: number;
  monitor_name: string;
  monitor_type: number;
  monitor_frequency: string;
  monitor_status: string;
  monitor_health: number;
  create_time: Date;
};
const tableListDataSource: MonitorItem[] = [];

const columns: ProColumns<MonitorItem>[] = [
  {
    title: '监控名称',
    width: 80,
    dataIndex: 'monitor_name',
    render: _ => <a>{_}</a>,
  },
  {
    title: '类型',
    dataIndex: 'monitor_type',
    key: 'monitor_type',
  },
  {
    title: '频率',
    dataIndex: 'monitor_frequency',
    key: 'monitor_frequency',
  },
  {
    title: '状态',
    width: 80,
    dataIndex: 'monitor_status',
    initialValue: 'all',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '健康度',
    dataIndex: 'monitor_health',
    render: () => (
      <>
        <Progress percent={50} status="active" />
      </>
    ),
  },
  {
    title: <>创建时间</>,
    width: 140,
    key: 'create_time',
    dataIndex: 'create_time',
    valueType: 'date',
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <Button key="disabled">禁用</Button>,
      <Button key="edit">编辑</Button>,
      <Button type="link" danger>
        删除
      </Button>,
    ],
  },
];

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

const MonitorItem = () => {
  const [openNew, setOpenNew] = useState(false);
  const [hostVisible, setHostVisible] = useState(false);
  const [form] = Form.useForm();
  const [missionForm] = Form.useForm();
  const [Hosts, setHosts] = useState<HostColumnProps[]>();
  const [selectHosts, setSelectHosts] = useState<React.Key[]>();
  const [current, setCurrent] = useState(0);
  const [targetKeys, setTargetKeys] = useState<string[]>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  const onFinish = (values: any) => {
    console.log('values', values);
  };

  const onSelect = (_: any, { node }: any) => {
    // setHosts({ type: node.type });
  };

  useEffect(() => {
    loadHostsData();
  }, []);
  const loadHostsData = async () => {
    const { data } = await getAllDevice(pagination);
    console.log('data', data);
    setHosts(data as HostColumnProps[]);
  };
  return (
    <div className="monitor-item">
      <ProTable<MonitorItem>
        columns={columns}
        request={(params, sorter, filter) => {
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
        dateFormatter="string"
        headerTitle="监控任务"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setOpenNew(true);
            }}
          >
            <PlusCircleOutlined />
            创建监控项
          </Button>,
          <Button key="custom">
            <PlusCircleOutlined />
            自定义监控项
          </Button>,
        ]}
      />

      <Modal
        title="新建任务"
        width="50%"
        footer={null}
        visible={openNew}
        onCancel={() => {
          setOpenNew(false);
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={16} offset={4}>
            <Steps current={current}>
              <Step title="创建任务" />
              <Step title="设置规则" />
            </Steps>
          </Col>
          <Col span={24}>
            {current === 0 ? (
              <Form key={current} {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="monitor_hosts" label="监控主机" rules={[{ required: true, message: '请选择主机' }]}>
                  <Button
                    type="link"
                    onClick={() => {
                      setHostVisible(true);
                    }}
                  >
                    选择主机
                  </Button>
                </Form.Item>
                <Form.Item name="monitor_type" label="监控类型" rules={[{ required: true, message: '请选择监控类型' }]}>
                  <Select placeholder="请选择监控类型" allowClear>
                    <Option value="cpu">CPU检测</Option>
                    <Option value="memory">内存检测</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="monitor_note" label="备注信息">
                  <TextArea rows={4} placeholder="备注信息" />
                </Form.Item>
                <Form.Item {...tailLayout} shouldUpdate>
                  {({ getFieldsValue }) => {
                    const { monitor_type } = getFieldsValue();
                    const formIsComplete = !!monitor_type && !!(selectHosts && selectHosts.length > 0);
                    return (
                      <Button
                        onClick={() => {
                          setCurrent(c => c + 1);
                          console.log('form', form.getFieldsValue());
                        }}
                        disabled={!formIsComplete}
                        style={{ marginRight: '8px' }}
                        type="primary"
                        htmlType="submit"
                      >
                        下一步
                      </Button>
                    );
                  }}
                </Form.Item>
              </Form>
            ) : (
              <Form
                initialValues={{
                  monitor_frequency: 5,
                  monitor_threshold: 2,
                  alarm_slient: 120,
                }}
                key={current}
                {...layout}
                form={missionForm}
                name="create_mission"
                onFinish={onFinish}
              >
                <Form.Item name="monitor_frequency" label="监控频率">
                  <Radio.Group>
                    <Radio value={1}>1分钟</Radio>
                    <Radio value={5}>5分钟</Radio>
                    <Radio value={15}>15分钟</Radio>
                    <Radio value={30}>30分钟</Radio>
                    <Radio value={60}>60分钟</Radio>
                    <Radio value={120}>120分钟</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="monitor_threshold" label="告警阈值">
                  <Radio.Group>
                    <Radio value={1}>1次</Radio>
                    <Radio value={2}>2次</Radio>
                    <Radio value={3}>3次</Radio>
                    <Radio value={4}>4次</Radio>
                    <Radio value={5}>5次</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="alarm_group" label="告警联系人组" rules={[{ required: true, message: '请选择联系人组' }]}>
                  <Transfer
                    rowKey={item => item.id}
                    dataSource={[
                      { title: '运维小队1', id: '1' },
                      { title: '运维小队2', id: '2' },
                      { title: '运维小队3', id: '3' },
                    ]}
                    titles={['已有联系组', '已选联系组']}
                    targetKeys={targetKeys}
                    onChange={nextTargetKeys => {
                      console.log('targetKeys:', nextTargetKeys);
                      setTargetKeys(nextTargetKeys);
                    }}
                    render={item => item.title}
                  />
                </Form.Item>
                <Form.Item name="alarm_mode" label="告警方式" rules={[{ required: true, message: '请选择告警方式' }]}>
                  <Checkbox.Group options={AlarmModes} />
                </Form.Item>
                <Form.Item extra="相同的告警信息，沉默期内只发送一次。" name="alarm_slient" label="沉默间隔">
                  <Select options={SlientList} allowClear style={{ width: '100%' }} optionLabelProp="label"></Select>
                </Form.Item>
                <Form.Item {...tailLayout} shouldUpdate>
                  {({ getFieldsValue }) => {
                    const { alarm_mode, alarm_group } = getFieldsValue();
                    const formIsComplete = !!(alarm_mode && alarm_mode.length > 0) && !!(alarm_group && alarm_group.length > 0);
                    return (
                      <>
                        <Button
                          onClick={() => {
                            console.log('missionForm', missionForm.getFieldsValue());
                          }}
                          disabled={!formIsComplete}
                          style={{ marginRight: '8px' }}
                          type="primary"
                          htmlType="submit"
                        >
                          提交
                        </Button>
                        <Button
                          onClick={() => {
                            setCurrent(c => c - 1);
                          }}
                        >
                          上一步
                        </Button>
                      </>
                    );
                  }}
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </Modal>

      <Modal
        width="60%"
        visible={hostVisible}
        title="选择主机"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setHostVisible(false);
        }}
        onOk={() => {
          form.setFieldsValue({ monitor_hosts: selectHosts });
          setHostVisible(false);
        }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <DirectoryTree multiple defaultExpandAll onSelect={onSelect} treeData={treeData} />
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
                      setSelectHosts(selectedRowKeys);
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
    </div>
  );
};

export default MonitorItem;
