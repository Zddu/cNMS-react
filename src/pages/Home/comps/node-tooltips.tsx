import { Graph, Item, NodeConfig } from '@antv/g6';
import React, { FC, useEffect, useState } from 'react';
import './node-tooltips.less';

export interface NodeTooltipsProps {
  graph?: Graph;
  item?: NodeConfig | null;
}

const NodeTooltips: FC<NodeTooltipsProps> = ({ item }) => {
  return <div className="node-tool-tips">{item?.label}</div>;
};

export default NodeTooltips;
