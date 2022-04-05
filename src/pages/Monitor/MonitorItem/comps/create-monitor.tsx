import { Button, Checkbox, Col, Form, Input, Modal, Radio, Row, Select, Steps, Transfer } from 'antd';
const { TextArea } = Input;
import React, { useContext, useState } from 'react';
import { AlarmModes, interfaceList, layout, SlientList, tailLayout } from '../index.type';
import { MonitorConext } from '../monitor-context';
const { Step } = Steps;
const { Option } = Select;

const CreateMonitor = () => {
  const { openNew, setOpenNew, setHostVisible, monitorIndexs, form } = useContext(MonitorConext) || {};
  const [missionForm] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [targetKeys, setTargetKeys] = useState<string[]>();
  const [show, setShow] = useState(false);

  return (
    <Modal
      title="新建任务"
      width="50%"
      footer={null}
      visible={openNew}
      onCancel={() => {
        setOpenNew?.(false);
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={16} offset={4}>
          <Steps current={current}>
            <Step title="创建任务" />
            <Step title="设置规则" />
          </Steps>
        </Col>
        {form && (
          <Col span={24}>
            {current === 0 ? (
              <Form key={current} {...layout} form={form} name="control-hooks">
                <Form.Item name="monitor_hosts" label="监控主机" rules={[{ required: true, message: '请选择主机' }]}>
                  <Button
                    type="link"
                    onClick={() => {
                      setHostVisible?.(true);
                    }}
                  >
                    选择主机
                  </Button>
                </Form.Item>
                <Form.Item name="monitor_type" label="监控类型" rules={[{ required: true, message: '请选择监控类型' }]}>
                  {monitorIndexs && (
                    <Select
                      options={monitorIndexs}
                      onChange={item => {
                        setShow(interfaceList.includes(item));
                      }}
                      fieldNames={{ value: 'monitor_index', label: 'monitor_name' }}
                      placeholder="请选择监控类型"
                      allowClear
                    />
                  )}
                </Form.Item>
                {show && (
                  <Form.Item shouldUpdate name="monitor_interface" label="监控接口" rules={[{ required: true, message: '请选择监控接口' }]}>
                    <Select placeholder="请选择监控接口">
                      <Option value="all">all</Option>
                      <Option value="eth0">eth0</Option>
                    </Select>
                  </Form.Item>
                )}

                <Form.Item name="monitor_note" label="备注信息">
                  <TextArea rows={4} placeholder="备注信息" />
                </Form.Item>
                <Form.Item {...tailLayout} shouldUpdate>
                  {({ getFieldsValue }) => {
                    const { monitor_type, monitor_interface, monitor_hosts } = getFieldsValue();
                    const condition = !!monitor_type && !!(monitor_hosts && monitor_hosts.length > 0);
                    const formIsComplete = !show ? condition : !!monitor_interface && condition;
                    return (
                      <Button
                        onClick={() => {
                          setCurrent(c => c + 1);
                          console.log('form', form?.getFieldsValue());
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
        )}
      </Row>
    </Modal>
  );
};

export default CreateMonitor;
