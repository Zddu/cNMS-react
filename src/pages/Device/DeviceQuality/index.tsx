import { useQuery } from '@/util/custom-hook';
import React, { useEffect, useState } from 'react';
import { DeviceProps } from '../DeviceView/index.type';
import NetworkDevice from './comps/network-device';
import Server from './comps/server';
import './index.less';

const DeviceQuality = () => {
  const { device_id } = useQuery();
  const [device, setDevice] = useState<DeviceProps>();

  useEffect(() => {
    if (device_id) {
      // 发送请求获取数据
    }
  }, [device_id]);
  return (
    <div className="device-quality">
      {/* {device?.type !== 'host' ? <Server /> : <NetworkDevice />} */}
      <Server />
    </div>
  );
};

export default DeviceQuality;
