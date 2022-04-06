/*
 * @Author: zengyan.zdde@bytedance.com
 * @Date: 2022-04-06 10:22:48
 * @LastEditTime: 2022-04-06 20:49:04
 * @LastEditors: zengyan.zdde@bytedance.com
 * @Description:
 * @FilePath: /cool-network-system-react/src/api/monitor/monitor.ts
 */
import { AlarmContactsItem } from '@/pages/Alarm/AlarmContacts/index.types';
import { AlarmGroupItem } from '@/pages/Alarm/AlarmGroup/index.types';
import { getData, postData } from '@/util/axios';

export interface GetMonitorIndexProps {
  id: number;
  monitor_index: string;
  monitor_nam: string;
}

export interface GetContactsProps {
  id: number;
  contact_id: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_wechat_token?: string;
  contact_dingtalk_token?: string;
  create_time: Date;
  current?: number;
  pageSize?: number;
}

export const getMonitorIndexs = () => getData<GetMonitorIndexProps[]>('/monitor/index');
export const getContacts = (params: Partial<GetContactsProps>) => getData<GetContactsProps[]>('/monitor/alarm/contact', params);

export const createContacts = (contact: AlarmContactsItem) => postData('/monitor/alarm/contact', contact);
export const createGroup = (group: AlarmGroupItem) => postData('/monitor/alarm/group', group);
