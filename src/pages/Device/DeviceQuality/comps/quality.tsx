import BasicChart from '@/components/BasicChart';
import { Col, Row } from 'antd';
import { EChartsOption } from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

const MemoryChart = () => {
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
              value: 60,
              name: '内存使用率',
            },
            {
              value: 40,
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

const CPUChart = () => {
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
              value: 10,
              name: 'CPU使用率',
            },
            {
              value: 90,
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
          <MemoryChart />
        </div>
      </Col>
      <Col span={12}>
        <div className="quality-item">
          <h3 className="title">CPU使用率</h3>
          <CPUChart />
        </div>
      </Col>
    </Row>
  );
};

export default Quality;
