import { GetDeviceInfoProps } from './../../../api/device/device';
import { PollType } from '@/api/device/device';

export const DEVICE_TYPE = {
  host: '服务器',
  'general switch': '二层交换机',
  'multifunctional switch': '三层交换机',
  router: '路由器',
};

export const OS_MAP = {
  Linux: 'Linux',
  Windows: 'Windows',
  Ruijie: 'Ruijie',
};

export type TableListItem = {
  key: number;
};

export const treeData = [
  {
    title: '校区',
    key: '0',
    children: [
      { title: '服务器', key: 'host', isLeaf: true, type: 'host' },
      { title: '路由器', key: 'router', isLeaf: true, type: 'router' },
      { title: '交换机', key: 'switch', isLeaf: true, type: 'switch' },
      { title: '防火墙', key: 'firewall', isLeaf: true, type: 'firewall' },
    ],
  },
  // {
  //   title: '南校区',
  //   key: '1',
  //   children: [
  //     { title: '服务器', key: '1-1', isLeaf: true },
  //     { title: '路由器', key: '1-2', isLeaf: true },
  //     { title: '交换机', key: '1-3', isLeaf: true },
  //   ],
  // },
];

export interface DeviceProps {
  device_id?: string;
  ip: string;
  community: string;
  port: number;
  alias_name?: string;
  ssh_enabled?: number;
  snmpver?: string;
  ssh_password?: string;
  tel_password?: string;
  hostname?: string;
}

export interface DeviceInfoProps {
  device?: DeviceProps;
  config?: PollType;
}

export type CurrentDeviceProps = DeviceProps & Partial<GetDeviceInfoProps>;
