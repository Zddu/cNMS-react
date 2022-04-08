export type AlarmHistoryItem = {
  key: number;
  alarm_id: number;
  monitor_name: string;
  monitor_type: number;
  monitor_host: string;
  alarm_status: string;
  alarm_continued: string;
  alarm_inform_type: string;
  alarm_inform_target: string;
  create_time: Date;
};
