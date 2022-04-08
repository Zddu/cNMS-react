export type AlarmContactsItem = {
  key: number;
  contact_id: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_wechat_token?: string;
  contact_dingtalk_token?: string;
  create_time?: Date;
};
