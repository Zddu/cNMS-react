import { getSSH, PostSSHConfig, postSSHConfig } from '@/api/device/device';
import SSH from '@/components/SSH';
import { useQuery } from '@/util/custom-hook';
import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

const SSHView = () => {
  const { device_id, host: ip } = useQuery();
  const [loading, setLoading] = useState(false);
  const [sshConfig, setSSHConfig] = useState<{ ip?: string; device_id: string; username: string; password: string; port: number }>();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (device_id && ip) {
      loadSSH();
    }
  }, [device_id, ip]);

  const loadSSH = async () => {
    const { data } = await getSSH(device_id as string, ip as string);
    if (device_id && data.username && data.port) {
      setSSHConfig({
        ip: ip as string,
        device_id,
        password: data.password,
        username: data.username,
        port: data.port,
      });
    }
    setLoading(true);
    console.log('data', data);
    setVisible(!Boolean(data.device_id));
  };

  const onFinish = (data: any) => {
    setSSHConfig(data);
    setVisible(false);
  };
  const onFinishFailed = () => {
    setVisible(false);
  };
  return (
    <div>
      <Modal
        onCancel={() => {
          setVisible(false);
          window.close();
        }}
        title="SSH配置"
        visible={visible}
        footer={null}
      >
        <Form
          initialValues={{
            device_id: device_id,
            port: 22,
            ip,
            username: 'root',
          }}
          name="SSH配置"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="设备ID" name="device_id">
            <Input disabled={Boolean(device_id)} />
          </Form.Item>

          <Form.Item label="登陆IP" name="ip" rules={[{ required: true, message: 'IP地址为必填项' }]}>
            <Input disabled={Boolean(ip)} />
          </Form.Item>

          <Form.Item label="port" name="port" rules={[{ required: true, message: '端口为必填项' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="登陆用户" name="username" rules={[{ required: true, message: '端口为必填项' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="登陆密码" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {!visible && loading && sshConfig && (
        <SSH
          sshConfig={sshConfig}
          reAuth={(v: boolean) => {
            message.error('认证失败！');
            setVisible(v);
          }}
        />
      )}
    </div>
  );
};

export default SSHView;
