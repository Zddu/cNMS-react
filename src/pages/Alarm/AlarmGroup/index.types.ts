/*
 * @Author: zengyan.zdde@bytedance.com
 * @Date: 2022-04-06 10:22:48
 * @LastEditTime: 2022-04-06 13:56:25
 * @LastEditors: zengyan.zdde@bytedance.com
 * @Description: 
 * @FilePath: /cool-network-system-react/src/pages/Alarm/AlarmGroup/index.types.ts
 */
export type AlarmGroupItem = {
  group_id: number;
  group_name: string;
  group_contacts: string[];
  group_description?: string;
  create_time?: Date;
};
