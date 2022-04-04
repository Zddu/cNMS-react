import { getAdapterData, GetAdapterInfoProps, getNetflowData, GetNetflowInfoProps } from '@/api/device/device';
import BasicChart from '@/components/BasicChart';
import { Col, Row, Select, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { EChartsOption, EChartsType } from 'echarts';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
const { Option } = Select;

const STATUS_MAP = {
  '1': '开启',
  '2': '关闭',
};
const COLOR_MAP = {
  '1': '#87d068',
  '2': '#f50',
};

const columns = [
  {
    title: '网卡名称',
    dataIndex: 'physics_if_name',
    key: 'physics_if_name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '网卡类型',
    dataIndex: 'physics_if_type',
    key: 'physics_if_type',
  },
  {
    title: 'IP地址',
    dataIndex: 'physics_if_ip_address',
    key: 'physics_if_ip_address',
  },
  {
    title: '子网掩码',
    dataIndex: 'physics_if_ip_mask',
    key: 'physics_if_ip_mask',
  },
  {
    title: 'MAC地址',
    dataIndex: 'physics_if_mac',
    key: 'physics_if_mac',
  },
  {
    title: '启用状态',
    dataIndex: 'physics_if_admin_status',
    key: 'physics_if_admin_status',
    render: (_: any, record: GetAdapterInfoProps) => <Tag color={COLOR_MAP[record.physics_if_admin_status]}>{STATUS_MAP[record.physics_if_admin_status]}</Tag>,
  },
  {
    title: '连接状态',
    dataIndex: 'physics_if_operation_status',
    key: 'physics_if_operation_status',
    render: (_: any, record: GetAdapterInfoProps) => <Tag color={COLOR_MAP[record.physics_if_operation_status]}>{STATUS_MAP[record.physics_if_operation_status]}</Tag>,
  },
  {
    title: '更新时间',
    dataIndex: 'last_polled',
    key: 'last_polled',
    width: 220,
    render: (last_polled: Date) => <a>{dayjs(last_polled).format('YYYY-MM-DD HH:mm:ss')}</a>,
  },
];

interface NetflowChartProps {
  data?: GetNetflowInfoProps[];
  onPoll?: (echartInstance?: EChartsType) => void;
  pollTime?: number;
}

const NetflowChart: FC<NetflowChartProps> = ({ data, onPoll, pollTime = 60 * 1000 }) => {
  const [option, setOption] = useState<EChartsOption>();
  const netflowChart = useRef<echarts.EChartsType>();

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (data) {
      init();
    }

    if (onPoll) {
      timer = setInterval(() => {
        onPoll(netflowChart.current);
      }, pollTime);
    }

    return () => {
      clearInterval(timer);
    };
  }, [data]);
  const init = () => {
    const xAxisData = data?.map(item => dayjs(item.last_polled).format('MM-DD HH:mm'));
    const yAxisData1 = data?.map(item => Number(item.outflow_rate));
    const yAxisData2 = data?.map(item => Number(item.inflow_rate));
    const color = ['#0787ED', '#EB5742', '#1BF3FF'];
    setOption({
      color: color,
      grid: {
        top: '10%',
        left: '3%',
        right: '5%',
        bottom: '20%',
      },
      legend: {
        itemHeight: 10,
        itemWidth: 10,
        top: 'top',
        right: 'center',
        orient: 'horizontal',
        textStyle: {
          fontSize: 12,
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b0} <br /> {a0}: {c0} KB/s<br />{a1}: {c1} KB/s',
        axisPointer: {
          type: 'line',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        show: true,
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
            color: '#1B3062',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#395383',
          },
        },
        axisTick: {
          show: false,
        },
        data: xAxisData,
      },
      yAxis: {
        show: true,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#1B3062',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#395383',
          },
        },
        axisLabel: {
          margin: 10,
          interval: 0,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 95,
          end: 100,
        },
        {
          start: 95,
          end: 100,
        },
      ],
      series: [
        {
          name: '上行流量',
          type: 'line',
          data: yAxisData1,
          smooth: false,
          symbolSize: 6,
        },
        {
          name: '下行流量',
          type: 'line',
          data: yAxisData2,
          smooth: false,
          symbolSize: 6,
        },
      ],
    });
  };
  return <BasicChart key="netflowChart" style={{ height: '300px' }} options={option} basicInstance={netflowChart} />;
};

const Adapter = () => {
  const [adapter, setAdapter] = useState<GetAdapterInfoProps[]>();
  const [netflow, setNetflow] = useState<GetNetflowInfoProps[]>();
  const loadAdapterData = async () => {
    const { data } = await getAdapterData('27e88b651bbb9821bdb25161900e360a');
    setAdapter(data);
  };

  const loadNetflowData = async (inter?: string) => {
    const { data } = await getNetflowData('27e88b651bbb9821bdb25161900e360a', inter);
    setNetflow(data);
  };

  useEffect(() => {
    loadNetflowData();
    loadAdapterData();
  }, []);

  const defaultSelect = useMemo(() => {
    const selectItem = adapter?.find(item => item.physics_if_type === 'ETHERNETCSMACD');
    return selectItem;
  }, [adapter]);

  const handleChange = (val: string) => {
    loadNetflowData(val);
  };

  return (
    <div className="adapter">
      <Row gutter={16}>
        <Col span={24}>
          <h3 className="title">网络</h3>
          <Table columns={columns} dataSource={adapter} />
        </Col>
        <Col span={24}>
          <h3 className="title">流量曲线</h3>
          {defaultSelect && (
            <Select defaultValue={defaultSelect?.physics_if_name} style={{ width: 200 }} onChange={handleChange}>
              {adapter?.map(item => (
                <Option key={item.physics_if_name} value={item.physics_if_name}>
                  {item.physics_if_name}
                </Option>
              ))}
            </Select>
          )}
          {netflow && <NetflowChart data={netflow} />}
        </Col>
      </Row>
    </div>
  );
};

export default Adapter;
