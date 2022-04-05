import { getData } from '@/util/axios';

export interface GetMonitorIndexProps {
  id: number;
  monitor_index: string;
  monitor_nam: string;
}

export const getMonitorIndexs = () => getData<GetMonitorIndexProps[]>('/monitor/index');
