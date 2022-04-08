import { AlarmContactsItem } from '../AlarmContacts/index.types';

export type AlarmGroupItem = {
  group_id: number;
  group_name: string;
  group_contacts: (AlarmGroupItem & AlarmContactsItem)[];
  group_description?: string;
  create_time?: Date;
};
