import G6, { Graph } from '@antv/g6';
import React, { useEffect, useState } from 'react';
import { data } from '../data';
import NodeTooltips from './node-tooltips';
import './topology.less';

const Topology = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  let graph: Graph;
  const [refGraph, setGraph] = useState<Graph>();

  useEffect(() => {
    if (!graph && ref.current) {
      console.log('ref.current', ref.current);
      graph = new G6.Graph({
        container: ref.current,
        width: ref.current.clientWidth,
        height: 500,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        layout: {
          type: 'force',
          preventOverlap: true, // 防止节点重叠
          // 防碰撞必须设置nodeSize或size,否则不生效，由于节点的size设置了40，虽然节点不碰撞了，但是节点之间的距离很近，label几乎都挤在一起，所以又重新设置了大一点的nodeSize,这样效果会好很多
          nodeSize: 100,
          linkDistance: 150,
        },
        defaultNode: {
          // 节点样式修改
          type: 'image', // 设置节点为图片
          size: [40, 40], // 节点大小
        },
      });
    }
    graph.data(data);
    graph.render();
    setGraph(graph);
  }, []);

  return (
    <>
      <div className="topology" ref={ref}></div> {refGraph && <NodeTooltips graph={refGraph} />}{' '}
    </>
  );
};

export default Topology;
