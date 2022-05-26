import { getTopologies } from '@/api/monitor/monitor';
import G6, { Graph } from '@antv/g6';
import React, { useEffect, useState } from 'react';
// import { data } from '../data';
import './topology.less';
import ServerHost from '@/assets/zhuji.svg';

const Topology = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  let graph: Graph;

  useEffect(() => {
    getTopologiesData();

    async function getTopologiesData() {
      const { data } = await getTopologies();
      data.nodes.forEach((node: any) => {
        node.img = ServerHost;
        node.label = node.label === 'host' ? '服务器主机' : node.label; // todo
      });

      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 20,
        getContent(e) {
          const resource = e?.item?.getModel() as Record<string, any>;
          const outDiv = document.createElement('div');
          outDiv.style.width = '200px';
          outDiv.innerHTML = `<div class="tips-container">
          <div style="font-size: 18px;">${resource.label}</div>
          <div style="font-size:14px;">IP地址：<span style="color: #0890eb;">${resource.ip}</span></div>
          <div style="font-size: 14px">CPU使用率：<span style="color: #0890eb;">${resource.data?.cpu.cpu_rate}%</span></div>
          <div style="font-size: 14px">内存使用率：<span style="color: #0890eb;">${resource.data?.mem.mem_usage}%</span></div>
          <div style="font-size: 14px">运行时长：<span style="color: #0890eb;">${resource.data?.uptime}%</span></div>
          <div style="font-size: 14px;word-wrap: break-word;white-space: normal;">系统描述：<span style="color: #0890eb;">${resource.data?.sysDescr}</span></div>
          </div>`;
          return outDiv;
        },
        itemTypes: ['node'],
      });
      if (!graph && ref.current) {
        graph = new G6.Graph({
          container: ref.current,
          width: ref.current.clientWidth,
          plugins: [tooltip],
          height: 500,
          modes: {
            default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
          },
          layout: {
            type: 'force',
            preventOverlap: true, // 防止节点重叠
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
      if (data.nodes.every((node: any) => Boolean(node.img))) {
        graph.data(data);
      }

      graph.on('node:click', e => {
        console.log('node:click', e?.item?.getModel());
      });
      graph.render();
    }
  }, []);

  return <div className="topology" ref={ref}></div>;
};

export default Topology;
