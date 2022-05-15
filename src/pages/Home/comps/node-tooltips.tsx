import { Graph } from '@antv/g6';
import React, { FC, useEffect } from 'react';
import './node-tooltips.less';

export interface NodeTooltipsProps {
  graph?: Graph;
}

const NodeTooltips: FC<NodeTooltipsProps> = ({ graph }) => {
  useEffect(() => {
    if (graph) {
      graph.on('node:mouseenter', e => {
        console.log('e', e);
      });
    }
  }, [graph]);
  return <div className="node-tool-tips"></div>;
};

export default NodeTooltips;
