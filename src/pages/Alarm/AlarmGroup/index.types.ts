import { AlarmContactsItem } from '../AlarmContacts/index.types';

/*
 * @Author: zengyan.zdde@bytedance.com
 * @Date: 2022-04-06 10:22:48
 * @LastEditTime: 2022-04-07 14:43:04
 * @LastEditors: zengyan.zdde@bytedance.com
 * @Description:
 * @FilePath: /cool-network-system-react/src/pages/Alarm/AlarmGroup/index.types.ts
 */
export type AlarmGroupItem = {
  group_id: number;
  group_name: string;
  group_contacts: (AlarmGroupItem & AlarmContactsItem)[];
  group_description?: string;
  create_time?: Date;
};
