export interface HostColumnProps {
  device_id: string;
  hostname?: string;
  ip?: number;
  type?: string;
}

export const AlarmModes = [
  {
    label: '微信',
    value: 'wechat',
  },
  {
    label: '邮件',
    value: 'email',
  },
  {
    label: '钉钉',
    value: 'dingtalk',
  },
];
export const SlientList = [
  {
    label: '5分钟',
    value: 5,
  },
  {
    label: '10分钟',
    value: 10,
  },
  {
    label: '15分钟',
    value: 15,
  },
  {
    label: '30分钟',
    value: 30,
  },
  {
    label: '60分钟',
    value: 60,
  },
  {
    label: '2小时',
    value: 120,
  },
  {
    label: '3小时',
    value: 180,
  },
  {
    label: '6小时',
    value: 360,
  },
  {
    label: '12小时',
    value: 720,
  },
  {
    label: '24小时',
    value: 1440,
  },
];
export type MonitorItem = {
  key: number;
  monitor_name: string;
  monitor_type: number;
  monitor_frequency: string;
  monitor_status: string;
  monitor_health: number;
  create_time: Date;
};

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
export const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export const interfaceList = ['monitor_interface', 'monitor_inflow', 'monitor_outflow', 'monitor_in_discards', 'monitor_out_discards', 'monitor_in_errors', 'monitor_out_errors'];
