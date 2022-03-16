import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import { addDevice, getAllDevice, getDefaultConfig, getDevice, GetDeviceInfoProps, GetDevicesProps, PollType } from '@/api/device/device';
import { Button, Drawer, Form, FormInstance, Modal, Steps } from 'antd';
import { PlusOutlined, LineChartOutlined, CodeOutlined, FormOutlined } from '@ant-design/icons';
import { CurrentDeviceProps, DeviceInfoProps, DeviceProps, DEVICE_TYPE, OS_MAP, TableListItem, treeData } from './index.type';
import AdvanceConfig from './comps/advance-config';
import BasicConfig from './comps/basic-config';
import { merge } from 'lodash';
import DeviceInfo from './comps/device-info';
const { Step } = Steps;

const steps = [
  {
    title: '基本配置',
    content: () => <BasicConfig key="basic" />,
  },
  {
    title: '高级配置',
    content: (config: PollType) => <AdvanceConfig key="advance" {...config} />,
  },
];

const DeviceView = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [defaultConfig, setDefaultConfig] = useState<PollType>();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoProps>();
  const [params, setParams] = useState<GetDevicesProps>();
  const [open, setOpen] = useState(false);
  const [currDevice, setCurrDevice] = useState<CurrentDeviceProps>();
  const formRef = useRef<FormInstance>(null);
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
      valueEnum: OS_MAP,
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
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        <a key="edit">
          <FormOutlined />
        </a>,
        <a
          key="monitor"
          onClick={() => {
            setOpen(true);
            setCurrDevice(record as unknown as DeviceProps);
          }}
        >
          <LineChartOutlined />
        </a>,
        <a key="login">
          <CodeOutlined />
        </a>,
      ],
    },
  ];
  const onSelect = (_: any, { node }: any) => {
    setParams({ ...params, type: node.type });
  };

  const request = async (param: GetDevicesProps) => {
    const { data }: any = await getAllDevice(param);
    return {
      success: true,
      data: data,
    };
  };

  const next = () => {
    const dInfo: DeviceProps = formRef.current?.getFieldsValue();
    setDeviceInfo({ ...deviceInfo, device: dInfo });
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const loadConfig = async () => {
    const { data } = await getDefaultConfig();
    setDefaultConfig(data.poll);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (open) {
      const loadDevice = async () => {
        const { data }: { data: GetDeviceInfoProps } = await getDevice(currDevice?.device_id as string);
        console.log(data);
        setCurrDevice({ ...merge(currDevice, data) });
      };
      loadDevice();
    }
  }, [open]);

  return (
    <div className="device-view">
      <ProTable<TableListItem>
        columns={columns}
        rowKey="device_id"
        params={params}
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
        request={request}
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
                onClick={async () => {
                  const deviceConfig: any = {};
                  const config = formRef.current?.getFieldsValue();
                  deviceConfig['poll'] = {
                    enabled: config['poll-enabled'],
                  };
                  delete config['poll-enabled'];
                  const pollItem = (deviceConfig['poll']['poll_item'] = {});
                  Object.keys(config).forEach(k => {
                    const key1 = k.split('-')[0];
                    const key2 = k.split('-')[1];
                    if (pollItem[key1]) {
                      pollItem[key1][key2] = config[k];
                    } else {
                      pollItem[key1] = {
                        [key2]: config[k],
                      };
                    }
                  });
                  const mergeInfo = merge({ config: { poll: defaultConfig } }, { ...deviceInfo, config: deviceConfig });
                  await addDevice(mergeInfo);
                  setParams({ current: 1, pageSize: 20 });
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
            {steps[current].content(defaultConfig as PollType)}
          </Form>
        </div>
      </Modal>

      <Drawer
        size="large"
        onClose={() => {
          setOpen(false);
        }}
        title={`${currDevice?.hostname}-${currDevice?.ip}`}
        placement="right"
        visible={open}
      >
        <DeviceInfo className="device-info" deviceInfo={currDevice || ({} as CurrentDeviceProps)} />
      </Drawer>
    </div>
  );
};

export default DeviceView;
