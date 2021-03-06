import React, { FC, useEffect } from 'react';
import { useRef, useState } from 'react';
import * as echarts from 'echarts';
import { CPU, getCpu } from '@/api/device/device';
import dayjs from 'dayjs';
import BasicChart from '@/components/BasicChart';
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
  const lastData = cpuData.slice(cpuData.length - 20, cpuData.length).map(({ cpu_rate, last_polled }) => ({
    value: [last_polled, Number(cpu_rate)],
  }));
  const cpuChart = useRef<echarts.EChartsType>();
  const init = () => {
    setOption({
      title: {
        subtext: 'CPU使用率',
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
          data: lastData,
        },
      ],
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (lastData) {
      init();
      const cpuNewData = lastData.slice();
      timer = setInterval(async function () {
        const { data: cpu } = await getCpu(deviceId);

        if (cpuNewData.length > 0 && cpuNewData[cpuNewData.length - 1].value[0] !== cpu.last_polled) {
          cpuNewData.shift();
          cpuNewData.push({ value: [cpu.last_polled, Number(cpu.cpu_rate)] });
          if (cpuChart.current) {
            cpuChart.current.setOption({
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
  return <BasicChart options={option} basicInstance={cpuChart} />;
};

export default CpuChart;
