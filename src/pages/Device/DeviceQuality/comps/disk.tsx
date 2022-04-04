import { getDiskData, GetDiskInfoProps } from '@/api/device/device';
import BasicChart from '@/components/BasicChart';
import { Col, Progress, Row, Table } from 'antd';
import dayjs from 'dayjs';
import { EChartsOption } from 'echarts';
import React, { FC, useRef } from 'react';
import { useEffect, useState } from 'react';

interface DiskChartProps {
  usage: number;
}
const DiskChart: FC<DiskChartProps> = ({ usage }) => {
  const [option, setOption] = useState<EChartsOption>();

  const diskChart = useRef<echarts.EChartsType>();
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
            formatter: function (params: any) {
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
              value: usage,
              name: '磁盘使用率',
            },
            {
              value: 100 - usage,
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
  }, [usage]);

  return <BasicChart style={{ height: '300px' }} options={option} basicInstance={diskChart} />;
};

const columns = [
  {
    title: '磁盘路径',
    dataIndex: 'disk_path',
    key: 'disk_path',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '磁盘大小',
    dataIndex: 'disk_size',
    key: 'disk_size',
  },
  {
    title: '磁盘使用量',
    dataIndex: 'disk_used',
    key: 'disk_used',
  },
  {
    title: '占用比',
    dataIndex: 'show',
    render: (_: any, record: GetDiskInfoProps) => (
      <Progress
        strokeColor={{
          from: '#87d068',
          to: '#ff8614',
        }}
        // percent={60}
        percent={Math.round((Number(record.disk_used.split(' ')[0]) * 100) / Number(record.disk_size.split(' ')[0]))}
        status="active"
      />
    ),
  },
  {
    title: '更新时间',
    dataIndex: 'last_polled',
    key: 'last_polled',
    width: 220,
    render: (last_polled: Date) => <a>{dayjs(last_polled).format('YYYY-MM-DD HH:mm:ss')}</a>,
  },
];

const Disk = () => {
  const [disk, setDisk] = useState<GetDiskInfoProps[]>();
  const [totalUsage, setTotalUsage] = useState(0);
  useEffect(() => {
    loadDiskInfo();
  }, []);
  const loadDiskInfo = async () => {
    const { data } = await getDiskData('27e88b651bbb9821bdb25161900e360a');
    const { disk_used, disk_size } = data.find(v => v.disk_path === '/') as GetDiskInfoProps;
    const size = Number(disk_size.split(' ')[0]);
    const used = Number(disk_used.split(' ')[0]);
    setTotalUsage(Math.round((used * 100) / size));
    setDisk(data);
  };
  return (
    <div className="disk">
      <Row gutter={16}>
        <Col span={24}>
          <DiskChart usage={totalUsage} />
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={disk} />
        </Col>
      </Row>
    </div>
  );
};

export default Disk;
