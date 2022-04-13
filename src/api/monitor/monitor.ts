import { AlarmContactsItem } from '@/pages/Alarm/AlarmContacts/index.types';
import { AlarmGroupItem } from '@/pages/Alarm/AlarmGroup/index.types';
import { MonitorItemProps } from '@/pages/Monitor/MonitorItem/index.type';
import { deleteData, getData, postData } from '@/util/axios';

export interface GetMonitorIndexProps {
  id: number;
  monitor_index: string;
  monitor_name: string;
  index_type: number; // 1-数值 2-布尔 3-枚举
}

export interface GetContactsProps {
  id: number;
  contact_id: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_wechat_token?: string;
  contact_dingtalk_token?: string;
  current?: number;
  pageSize?: number;
}

export interface GetGroupsProps {
  group_name?: string;
  group_id: number;
  group_description?: string;
  group_contacts?: string;
  current?: number;
  pageSize?: number;
}

export interface GetMonitorProps extends Partial<MonitorItemProps> {
  current?: number;
  pageSize?: number;
}
export interface BaseProps {
  current?: number;
  pageSize?: number;
}

export interface GetAlarmsProps extends BaseProps {
  alarm_id?: number;
  mission_name?: string;
  monitor_type?: string;
  monitor_host?: string;
  alarm_status?: number;
  alarm_times?: number;
  alarm_continued?: number;
  alarm_inform_type?: string;
  alarm_inform_target?: string;
  error_info?: string;
  create_time?: Date;
  update_time?: Date;
}

export const getMonitorIndexs = () => getData<GetMonitorIndexProps[]>('/monitor/index');
export const getContacts = (params: Partial<GetContactsProps>) => getData<GetContactsProps[]>('/monitor/alarm/contact', params);
export const getGroups = (params: Partial<GetGroupsProps>) => getData<GetGroupsProps[]>('/monitor/alarm/group', params);
export const getMonitorList = (params: GetMonitorProps) => getData<GetMonitorProps[]>('/monitor', params);
export const getAlarms = (params: GetAlarmsProps) => getData<GetAlarmsProps[]>('/monitor/alarms', params);

export const createContacts = (contact: AlarmContactsItem) => postData('/monitor/alarm/contact', contact);
export const createGroup = (group: AlarmGroupItem) => postData('/monitor/alarm/group', group);
export const createMonitor = (monitor: MonitorItemProps) => postData('/monitor', monitor);

export const deleteMonitorItem = (mission_id: number) => deleteData('/monitor', { mission_id });
