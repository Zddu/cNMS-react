export type AlarmHistoryItem = {
  key: number;
  monitor_name: string;
  monitor_type: number;
  monitor_frequency: string;
  monitor_status: string;
  monitor_health: number;
  create_time: Date;
};
