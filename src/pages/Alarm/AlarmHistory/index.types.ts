/*
 * @Author: zengyan.zdde@bytedance.com
 * @Date: 2022-04-06 10:22:48
 * @LastEditTime: 2022-04-06 13:42:52
 * @LastEditors: zengyan.zdde@bytedance.com
 * @Description: 
 * @FilePath: /cool-network-system-react/src/pages/Alarm/AlarmHistory/index.types.ts
 */
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
