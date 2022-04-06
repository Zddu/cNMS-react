/*
 * @Author: zengyan.zdde@bytedance.com
 * @Date: 2022-04-06 10:22:48
 * @LastEditTime: 2022-04-06 20:31:04
 * @LastEditors: zengyan.zdde@bytedance.com
 * @Description:
 * @FilePath: /cool-network-system-react/src/pages/Alarm/AlarmContacts/index.tsx
 */
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Form, Input, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { AlarmContactsItem } from './index.types';
import { createContacts, getContacts, GetContactsProps } from "@/api/monitor/monitor";

const columns: ProColumns<AlarmContactsItem>[] = [
  {
    title: '姓名',
    dataIndex: 'contact_name',
    render: _ => <a>{_}</a>,
  },
  {
    title: '手机号',
    dataIndex: 'contact_phone',
    hideInSearch: true,
  },
  {
    title: '邮箱',
    dataIndex: 'contact_email',
    hideInSearch: true,
  },
  {
    title: '微信Token',
    dataIndex: 'contact_wechat_token',
    hideInSearch: true,
  },
  {
    title: '钉钉Token',
    dataIndex: 'contact_dingtalk_token',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    hideInSearch: true,
    valueType: 'dateTime',
  },
];

const AlarmContacts = () => {
  const [openCreateModal, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [params, setParams] = useState<Partial<GetContactsProps>>();

  const request = async (param: GetContactsProps) => {
    const { data }: any = await getContacts(param);
    return {
      success: true,
      data: data,
    };
  };

  return (
    <div className="alarm-contacts">
      <ProTable<AlarmContactsItem>
        headerTitle="告警联系人"
        params={params}
        columns={columns}
        request={request}
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
        title="新建联系人"
        visible={openCreateModal}
        onOk={async () => {
          const fields = form.getFieldsValue();
          if (!fields.contact_name) {
            message.error('请输入联系人姓名');
            return;
          }
          if (!fields.contact_email) {
            message.error('请输入邮箱地址');
            return;
          }
          console.log('ok', fields);
          await createContacts(fields);
          setParams({ current: 1, pageSize: 20 });
          setOpen(false);
        }}
        onCancel={() => {
          console.log('cancel');
          setOpen(false);
        }}
      >
        <Form name="create_contact" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} autoComplete="off">
          <Form.Item label="姓名" name="contact_name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item label="手机号" name="contact_phone">
            <Input placeholder="请输入联系人手机号" />
          </Form.Item>
          <Form.Item label="邮箱" name="contact_email" rules={[{ required: true, message: '请输入邮箱地址' }]}>
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>
          <Form.Item label="微信Token" name="contact_wechat_token">
            <Input placeholder="请输入微信Token" />
          </Form.Item>
          <Form.Item label="钉钉Token" name="contact_dingtalk_token">
            <Input placeholder="请输入钉钉Token" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlarmContacts;
