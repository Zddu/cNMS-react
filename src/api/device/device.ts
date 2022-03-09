import { getData } from '@/util/axios';

export interface BasicItemProps {
  enabled: boolean;
  poll_cron: string;
}

export interface FlowItemProps extends BasicItemProps {
  average_time: { value: number; time_list: number[] };
  unit: { value: number; list: string[] };
  decimal: { value: number };
}

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

export const getAllDevice = () => getData('/cool/devices');

export const getDefaultConfig = () => getData<ConfigProps>('/cool/device/default_config');
