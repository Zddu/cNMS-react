import React, { FC, useEffect } from 'react';
import { useRef, useState } from 'react';
import * as echarts from 'echarts';
import { CPU, getCpu } from '@/api/device/device';
import dayjs from 'dayjs';
type EChartsOption = echarts.EChartsOption;

interface DataItem {
  value: [string, number];
}

export interface CpuChartProps {
  cpuData: CPU[];
  deviceId: string;
}

const CpuChart: FC<CpuChartProps> = ({ cpuData, deviceId }) => {
  const [option, setOption] = useState<EChartsOption>();
  const cpuRef = useRef<HTMLDivElement>(null);
  const last10Data = cpuData.slice(cpuData.length - 20, cpuData.length).map(({ cpu_rate, last_polled }) => ({
    value: [last_polled, Number(cpu_rate)],
  }));
  const [cpuChart, setCpuChart] = useState<echarts.EChartsType>();
  const init = () => {
    setOption({
      title: {
        subtext: 'cpu使用率',
        top: '0',
        left: '0',
      },
      grid: [{ left: '5%', bottom: '15%', top: '25%', right: '15' }],
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          return 'CPU使用率: ' + params.value[1] + '% <br /> 时间: ' + dayjs(params.value[0]).format('HH:mm');
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitNumber: 3,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: last10Data,
        },
      ],
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (last10Data) {
      init();
      const cpuNewData = last10Data.slice();
      timer = setInterval(async function () {
        const { data: cpu } = await getCpu(deviceId);

        if (cpuNewData.length > 0 && cpuNewData[cpuNewData.length - 1].value[0] !== cpu.last_polled) {
          cpuNewData.shift();
          cpuNewData.push({ value: [cpu.last_polled, Number(cpu.cpu_rate)] });
          if (cpuChart) {
            cpuChart.setOption({
              series: [
                {
                  data: cpuNewData,
                },
              ],
            });
          }
        }
      }, 10000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [cpuData]);

  useEffect(() => {
    if (cpuRef.current) {
      const cpuChart = echarts.init(cpuRef.current);
      setCpuChart(cpuChart);
    }

    option && cpuChart && cpuChart.setOption(option);
  }, [option]);
  return <div className="cou-chart" style={{ width: '100%', height: '150px' }} ref={cpuRef}></div>;
};

export default CpuChart;
