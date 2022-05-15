/* 主页 */

import React from 'react';

import './index.less';
import { Card, Col, Row, Statistic } from 'antd';
import Topology from './comps/topology';

export default function HomePageContainer(): JSX.Element {
  return (
    <div className="page-home all_nowarp">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Statistic title="设备" formatter={value => <a style={{ fontSize: '28px' }}>{value}</a>} valueStyle={{ fontSize: '14px' }} value={2} precision={0} suffix="个" />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Statistic title="监控" formatter={value => <a style={{ fontSize: '28px' }}>{value}</a>} valueStyle={{ fontSize: '14px' }} value={5} precision={0} suffix="项" />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Statistic title="告警" formatter={value => <a style={{ fontSize: '28px' }}>{value}</a>} valueStyle={{ fontSize: '14px' }} value={1} precision={0} suffix="项" />
          </Card>
        </Col>
        <Col span={24}>
          <Topology />
        </Col>
        <Col span={8}></Col>
        <Col span={8}></Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}
