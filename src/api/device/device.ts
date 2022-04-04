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
  device_id?: string;
  hostname?: string;
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

export interface GetProcessInfoProps {
  pid: number;
  processName: string;
  processPath: string;
  runParameters: string;
  runType: 'unknown' | 'operatingSystem' | 'deviceDriver' | 'application';
  runStatus: 'running' | 'runnable' | 'notRunnable' | 'invalid';
  last_polled: Date;
}

export interface GetDiskInfoProps {
  device_id: string;
  disk_path: string;
  disk_size: string;
  disk_used: string;
  last_polled: Date;
}

export interface GetAdapterInfoProps {
  device_id: string;
  physics_if_name: string;
  physics_if_type: string;
  physics_if_mac: string;
  physics_if_operation_status: string;
  physics_if_admin_status: string;
  physics_if_ip_address: string;
  physics_if_ip_mask: string;
  last_polled: Date;
}
export interface UdpConnItemProps {
  device_id?: string;
  local_address: string;
  local_port: number;
  last_polled: Date;
}
export interface TcpConnItemProps {
  device_id?: string;
  tcp_conn_state: 'closed' | 'listen' | 'synSent' | 'synReceived' | 'established' | 'finWait1' | 'finWait2' | 'closeWait' | 'lastAck' | 'closing' | 'timeWait' | 'deleteTCB';
  local_address: string;
  local_port: number;
  remote_address: string;
  remote_port: number;
  last_polled: Date;
}

export interface GetServicesInfoProps {
  tcpTable: TcpConnItemProps[];
  udpTable: UdpConnItemProps[];
}

export interface GetNetflowInfoProps {
  device_id?: string;
  physics_if_name: string;
  inflow_rate: string;
  outflow_rate: string;
  in_discards_rate: string;
  out_discards_rate: string;
  in_error_rate: string;
  out_error_rate: string;
  if_status: string;
  last_polled: string;
}

export interface GetApplicationInfoProps {
  device_id?: string;
  index: string;
  name: string;
  type: string;
  datetime: string;
  last_polled: Date;
}

export const getAllDevice = (params: GetDevicesProps) => getData<GetDevicesProps[]>('/cool/devices', params);
export const getDefaultConfig = () => getData<ConfigProps>('/cool/device/default_config');

export const addDevice = (device: any) => postData('/cool/devices', device);
export const getDevice = (device_id: string) => getData<GetDeviceInfoProps>('/cool/device/info', { device_id });

export const getCpu = (device_id: string) => getData<CPU>('/cool/cpu/info', { device_id });
export const getMem = (device_id: string) => getData<Memory>('/cool/mem/info', { device_id });

export const postSSHConfig = (config: PostSSHConfig) => postData('/cool/ssh/info', config);
export const getSSH = (device_id: string, ip: string) => getData<PostSSHConfig>('/cool/ssh/info', { device_id, ip });

export const getProcessData = (device_id: string) => getData<GetProcessInfoProps[]>('/cool/process/info', { device_id });
export const getDiskData = (device_id: string) => getData<GetDiskInfoProps[]>('/cool/disk/info', { device_id });

export const getAdapterData = (device_id: string) => getData<GetAdapterInfoProps[]>('/cool/adapter/info', { device_id });
export const getServicesData = (device_id: string) => getData<GetServicesInfoProps>('/cool/services/info', { device_id });

export const getNetflowData = (device_id: string, adapter?: string) => getData<GetNetflowInfoProps[]>('/cool/netflow/info', { device_id, adapter });
export const getApplicationData = (device_id: string) => getData<GetApplicationInfoProps[]>('/cool/application/info', { device_id });
