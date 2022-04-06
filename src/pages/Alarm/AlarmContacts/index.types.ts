/*
 * @Author: zengyan.zdde@bytedance.com
 * @Date: 2022-04-06 10:22:48
 * @LastEditTime: 2022-04-06 13:11:54
 * @LastEditors: zengyan.zdde@bytedance.com
 * @Description: 
 * @FilePath: /cool-network-system-react/src/pages/Alarm/AlarmContacts/index.types.ts
 */
export type AlarmContactsItem = {
  key: number;
  contact_id:number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_wechat_token?: string;
  contact_dingtalk_token?: string;
  create_time?: Date;
};
