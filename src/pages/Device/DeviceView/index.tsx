import React, { FC, useEffect, useRef, useState } from 'react';
import './index.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import { getAllDevice, getDefaultConfig, PollType } from '@/api/device/device';
import { Button, Col, Divider, Form, FormInstance, Input, Modal, Row, Select, Steps, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DEVICE_TYPE, TableListItem, treeData } from './index.type';
import AdvanceConfig from './comps/advance-config';
import BasicConfig from './comps/basic-config';
const { Option } = Select;
const { Step } = Steps;

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
  const onSelect = (keys: React.Key[]) => {
    setKey(keys[0] as string);
  };

  const next = () => {
    const deviceInfo = formRef.current?.getFieldsValue();
    console.log('device', deviceInfo);

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
                  const deviceConfig: any = {};
                  const config = formRef.current?.getFieldsValue();
                  console.log('提交', config);
                  Object.keys(config).forEach(k => {
                    const key1 = k.split('-')[0];
                    const key2 = k.split('-')[1];
                    if (deviceConfig[key1]) {
                      deviceConfig[key1][key2] = config[k];
                    } else {
                      deviceConfig[key1] = {
                        [key2]: config[k],
                      };
                    }
                  });
                  console.log(deviceConfig);

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
