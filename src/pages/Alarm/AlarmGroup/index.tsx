/*
 * @Author: zengyan.zdde@bytedance.com
 * @Date: 2022-04-06 10:22:48
 * @LastEditTime: 2022-04-06 20:50:32
 * @LastEditors: zengyan.zdde@bytedance.com
 * @Description:
 * @FilePath: /cool-network-system-react/src/pages/Alarm/AlarmGroup/index.tsx
 */
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Form, Input, message, Modal, Transfer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { AlarmGroupItem } from './index.types';
import TextArea from 'antd/lib/input/TextArea';
import { createGroup, getContacts, GetContactsProps } from '@/api/monitor/monitor';

const columns: ProColumns<AlarmGroupItem>[] = [
  {
    title: '组名称',
    dataIndex: 'group_name',
    width: 120,
    render: _ => <a>{_}</a>,
  },
  {
    title: '成员',
    dataIndex: 'group_contacts',
    hideInSearch: true,
    render: (_, record) => (
      <>
        {record.group_contacts.map(item => (
          <>{`${item} `}</>
        ))}
      </>
    ),
  },
  {
    title: '描述',
    dataIndex: 'group_description',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    hideInSearch: true,
    valueType: 'dateTime',
  },
];

const AlarmGroup = () => {
  const [openCreateModal, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [targetKeys, setTargetKeys] = useState<string[]>();
  const [contacts, setContacts] = useState<Partial<GetContactsProps>[]>();

  useEffect(() => {
    loadContactsData();
  }, []);

  const loadContactsData = async () => {
    const { data } = await getContacts({ current: 1, pageSize: 20 });
    setContacts(data);
  };

  return (
    <div className="alarm-contacts">
      <ProTable<AlarmGroupItem>
        headerTitle="告警联系组"
        columns={columns}
        request={params => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                group_id: 1,
                group_name: '运维小队1',
                group_contacts: ['张三'],
                group_description: '12345566772',
              },
            ],
            success: true,
          });
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpen(true);
              form.resetFields();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <Modal
        width="45%"
        title="新建联系组"
        visible={openCreateModal}
        onOk={async () => {
          const fields = form.getFieldsValue();
          if (!fields.group_name) {
            message.error('请输入联系组名称');
            return;
          }
          if (!fields.group_contacts) {
            message.error('至少选择一个联系人');
            return;
          }
          console.log('ok', fields);
          await createGroup(fields);

          setOpen(false);
        }}
        onCancel={() => {
          console.log('cancel');
          setOpen(false);
        }}
      >
        <Form name="create_contact" form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }} autoComplete="off">
          <Form.Item label="组名称" name="group_name" rules={[{ required: true, message: '请输入组名称' }]}>
            <Input placeholder="请输入组名称" />
          </Form.Item>
          <Form.Item label="备注信息" name="group_description">
            <TextArea placeholder="请输入联系人手机号" />
          </Form.Item>
          <Form.Item label="选择联系人" name="group_contacts" rules={[{ required: true, message: '请输入邮箱地址' }]}>
            <Transfer
              rowKey={item => `${item.contact_id}`}
              dataSource={contacts}
              titles={['已有联系人', '已选联系人']}
              targetKeys={targetKeys}
              onChange={nextTargetKeys => {
                form.setFieldsValue({
                  group_contacts: nextTargetKeys,
                });
                setTargetKeys(nextTargetKeys);
              }}
              render={item => item.contact_name || ''}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlarmGroup;
