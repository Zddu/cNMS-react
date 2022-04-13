export type AlarmHistoryItem = {
  alarm_id?: number;
  mission_name?: string;
  monitor_type?: string;
  monitor_host?: string;
  alarm_status?: number;
  alarm_times?: number;
  alarm_continued?: number;
  alarm_inform_type?: string;
  alarm_inform_target?: string;
  error_info?: string;
  create_time?: Date;
  update_time?: Date;
};
