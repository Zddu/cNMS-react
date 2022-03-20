import SSH from '@/components/SSH';
import { Card } from 'antd';
import React, { FC, useEffect } from 'react';
import { CurrentDeviceProps } from '../index.type';
import CpuChart from './cpu-chart';
import MemChart from './mem-chart';

interface DeviceInfoProps {
  className?: string;
  deviceInfo: CurrentDeviceProps;
}

const DeviceInfo: FC<DeviceInfoProps> = ({ className, deviceInfo }) => {
  return (
    <div className="device-info-wrapper">
      <Card className={className} style={{ width: '100%' }}>
        <h3>{deviceInfo.hostname}</h3>
        <p>
          处理器:{'   '}
          {deviceInfo.physics && (
            <a className="text">
              {deviceInfo.physics[0].cpu_model} {deviceInfo.physics[0].cpu_number}核
            </a>
          )}
        </p>
        <p>
          存储空间:{'   '}
          {deviceInfo.physics && <a className="text">{Math.ceil(Number(deviceInfo.physics[0].disk_total_size?.split(' ')[0]))}GB</a>}
        </p>
        <p>
          内存大小:{'   '}
          {deviceInfo.physics && <a className="text">{Math.ceil(Number(deviceInfo.physics[0].mem_total_size?.split(' ')[0]))}GB</a>}
        </p>
        <p>
          设备ID:{'   '}
          {deviceInfo.device_id && <a className="text">{deviceInfo.device_id}</a>}
        </p>
        <p>
          接口信息:{'   '}
          {deviceInfo.physics && <a className="text">{deviceInfo.physics[0].inter_model}</a>}
        </p>
      </Card>
      <CpuChart deviceId={deviceInfo.device_id || ''} cpuData={deviceInfo.cpu || []} />
      <MemChart deviceId={deviceInfo.device_id || ''} memData={deviceInfo.mem || []} />
    </div>
  );
};

export default DeviceInfo;
