import { getData, postData } from '@/util/axios';

export interface BasicItemProps {
  enabled: boolean;
  poll_cron: string;
}

export interface FlowItemProps extends BasicItemProps {
  average_time: { value: number; time_list: number[] };
  unit: { value: number; list: string[] };
  decimal: { value: number };
}

export type Physics = {
  cpu_model: string;
  cpu_number: number;
  device_id: string;
  disk_total_size: string;
  inter_model: string;
  inter_number: number;
  last_polled: string;
  mem_total_size: string;
};

export type CPU = {
  cpu_rate: number;
  device_id: string;
  last_polled: string;
};

export type Disk = {
  disk_path: number;
  disk_size: string;
  disk_used: string;
  device_id: string;
  last_polled: string;
};

export type Interface = {
  physics_if_admin_status: string;
  physics_if_ip_address: string;
  physics_if_ip_mask: string;
  physics_if_mac: string;
  physics_if_name: string;
  physics_if_type: string;
  device_id: string;
  last_polled: string;
};

export type Memory = {
  device_id: string;
  mem_usage: string;
  last_polled: string;
};

export type PollItemType = {
  cpu: BasicItemProps;
  flow: FlowItemProps;
  interface: BasicItemProps;
  physics: BasicItemProps;
  disk: BasicItemProps;
  mem: BasicItemProps;
};
export type PollType = {
  enabled: boolean;
  poll_item: PollItemType;
};
export interface ConfigProps {
  poll: PollType;
}

export interface GetDevicesProps {
  current?: number;
  alias_name?: string;
  ip?: string;
  os?: string;
  pageSize?: number;
  key?: string;
  type?: string;
}

export interface GetDeviceInfoProps {
  physics: Partial<Physics>[];
  cpu: CPU[];
  mem: Memory[];
  disk: Disk[];
  interface: Interface[];
}

export interface PostSSHConfig {
  device_id: string;
  username?: string;
  password: string;
  port?: number;
}

export const getAllDevice = (params: GetDevicesProps) => getData('/cool/devices', params);

export const getDefaultConfig = () => getData<ConfigProps>('/cool/device/default_config');

export const addDevice = (device: any) => postData('/cool/devices', device);
export const getDevice = (device_id: string) => getData<GetDeviceInfoProps>('/cool/device/info', { device_id });

export const getCpu = (device_id: string) => getData<CPU>('/cool/cpu/info', { device_id });
export const getMem = (device_id: string) => getData<Memory>('/cool/mem/info', { device_id });

export const postSSHConfig = (config: PostSSHConfig) => postData('/cool/ssh/info', config);
export const getSSH = (device_id: string, ip: string) => getData<PostSSHConfig>('/cool/ssh/info', { device_id, ip });
