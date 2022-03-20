import React, { CSSProperties, FC, useEffect } from 'react';
import { useRef } from 'react';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

export interface BasicChartProps {
  options?: EChartsOption;
  style?: CSSProperties;
  basicInstance?: React.MutableRefObject<echarts.ECharts | undefined>;
}

const BasicChart: FC<BasicChartProps> = ({ options, style, basicInstance }) => {
  const basicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (basicRef.current && basicInstance) {
      basicInstance.current = echarts.init(basicRef.current);
    }

    options && basicInstance?.current && basicInstance?.current.setOption(options);
  }, [options]);
  return <div className="basic-chart" style={style || { width: '100%', height: '150px' }} ref={basicRef}></div>;
};

export default BasicChart;
