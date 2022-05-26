import { GetDeviceInfoProps, getDevice } from '@/api/device/device';
import BasicChart from '@/components/BasicChart';
import { RootState } from '@/store';
import { Col, Row } from 'antd';
import { EChartsOption } from 'echarts';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

interface ChartProps {
  data?: GetDeviceInfoProps;
}

const MemoryChart: FC<ChartProps> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>();
  const memChart = useRef<echarts.EChartsType>();
  const init = () => {
    setOption({
      tooltip: {
        show: false,
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: 'memory',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            fontSize: 20,
            formatter: function (params) {
              return '{value|' + params.value + '} {unit|%}\n{name|' + params.name + '}';
            },
            rich: {
              value: {
                fontFamily: 'SFUDINEngschrift',
                fontSize: 24,
                fontWeight: 200,
                color: '#343434',
                verticalAlign: 'bottom',
              },
              unit: {
                fontFamily: 'SFUDINEngschrift',
                fontSize: 11,
                color: '#9F9F9F',
                lineHeight: 17,
                verticalAlign: 'bottom',
              },
              name: {
                fontFamily: 'Microsoft YaHei',
                fontSize: 11,
                color: '#9F9F9F',
                lineHeight: 20,
              },
            },
          },
          emphasis: {
            disabled: true,
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: Number(data?.mem[data?.mem.length - 1].mem_usage),
              name: '内存使用率',
            },
            {
              value: 100 - (Number(data?.mem[data?.mem.length - 1].mem_usage) || 0),
              name: 'unused',
              label: {
                show: false,
              },
              itemStyle: {
                color: '#E6E6E6',
              },
            },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    init();
  }, []);

  return <BasicChart style={{ height: '300px' }} options={option} basicInstance={memChart} />;
};

const CPUChart: FC<ChartProps> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>();

  const cpuChart = useRef<echarts.EChartsType>();
  const init = () => {
    setOption({
      tooltip: {
        show: false,
      },
      legend: {
        show: false,
      },
      series: [
        {
          silent: true,
          name: 'CPU',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: function (params) {
              return '{value|' + params.value + '} {unit|%}\n{name|' + params.name + '}';
            },
            rich: {
              value: {
                fontFamily: 'SFUDINEngschrift',
                fontSize: 24,
                fontWeight: 200,
                color: '#343434',
                verticalAlign: 'bottom',
              },
              unit: {
                fontFamily: 'SFUDINEngschrift',
                fontSize: 11,
                color: '#9F9F9F',
                lineHeight: 17,
                verticalAlign: 'bottom',
              },
              name: {
                fontFamily: 'Microsoft YaHei',
                fontSize: 11,
                color: '#9F9F9F',
                lineHeight: 20,
              },
            },
          },
          emphasis: {
            disabled: true,
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: data?.cpu[data?.cpu.length - 1].cpu_rate,
              name: 'CPU使用率',
            },
            {
              value: 100 - (data?.cpu[data?.cpu.length - 1].cpu_rate || 0),
              name: 'unused',
              label: {
                show: false,
              },
              itemStyle: {
                color: '#E6E6E6',
              },
            },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    init();
  }, []);

  return <BasicChart style={{ height: '300px' }} options={option} basicInstance={cpuChart} />;
};

const Quality = () => {
  const [device, setDevice] = useState<GetDeviceInfoProps>();
  const device_id = useSelector((state: RootState) => state.app.device_id);
  useEffect(() => {
    if (device_id) {
      getDeviceData(device_id);
    }
  }, [device_id]);

  const getDeviceData = async (device_id: string) => {
    const { data } = await getDevice(device_id);
    setDevice(data);
  };
  return (
    <Row gutter={16} className="quality">
      <Col span={12}>
        <div className="quality-item">
          <h3 className="title">内存使用率</h3>
          <ul className="item-text">
            <li>内存总量: 2GB</li>
            <li>已用内存: 1.4GB</li>
            <li>可用内存: 0.6GB</li>
          </ul>
          {device && <MemoryChart data={device} />}
        </div>
      </Col>
      <Col span={12}>
        <div className="quality-item">
          <h3 className="title">CPU使用率</h3>
          {device && <CPUChart data={device} />}
        </div>
      </Col>
    </Row>
  );
};

export default Quality;
