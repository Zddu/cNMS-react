import React, { FC, useEffect } from 'react';
import { useRef, useState } from 'react';
import * as echarts from 'echarts';
import { getMem, Memory } from '@/api/device/device';
import dayjs from 'dayjs';
import BasicChart from '@/components/BasicChart';
type EChartsOption = echarts.EChartsOption;

interface DataItem {
  value: [string, number];
}

export interface memChartProps {
  memData: Memory[];
  deviceId: string;
}

const MemChart: FC<memChartProps> = ({ memData, deviceId }) => {
  const [option, setOption] = useState<EChartsOption>();
  const lastData = memData.slice(memData.length - 20, memData.length).map(({ mem_usage, last_polled }) => ({
    value: [last_polled, Number(mem_usage)],
  }));
  const memChart = useRef<echarts.EChartsType>();
  const init = () => {
    setOption({
      title: {
        subtext: '内存使用率',
        top: '0',
        left: '0',
      },
      grid: [{ left: '5%', bottom: '15%', top: '25%', right: '15' }],
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          return '内存使用率: ' + params.value[1] + '% <br /> 时间: ' + dayjs(params.value[0]).format('HH:mm');
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
      const memNewData = lastData.slice();
      timer = setInterval(async function () {
        const { data: mem } = await getMem(deviceId);

        if (memNewData.length > 0 && memNewData[memNewData.length - 1].value[0] !== mem.last_polled) {
          memNewData.shift();
          memNewData.push({ value: [mem.last_polled, Number(mem.mem_usage)] });
          if (memChart.current) {
            memChart.current.setOption({
              series: [
                {
                  data: memNewData,
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
  }, [memData]);
  return <BasicChart options={option} basicInstance={memChart} />;
};

export default MemChart;
