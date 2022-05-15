import Firewall from '@/assets/firewall.svg';
import ServerHost from '@/assets/zhuji.svg';
import Switch from '@/assets/switch.svg';
import Router from '@/assets/luyouqi.svg';
import ThreeSwitch from '@/assets/layer-three-switch.svg';

export const data = {
  nodes: [
    {
      id: '1',
      label: '三层交换机',
      img: ThreeSwitch,
      ip: '172.17.137.126'
    }, {
      id: '2',
      label: '二层交换机',
      img: Switch,
      ip: '192.168.1.1'
    }, {
      id: '3',
      label: '二层交换机',
      img: Switch,
      ip: '192.168.1.2'
    }, {
      id: '4',
      label: '二层交换机',
      img: Switch,
      ip: '192.168.1.3'
    }, {
      id: '5',
      label: '二层交换机',
      img: Switch,
      ip: '192.168.1.4'
    }, {
      id: '6',
      label: '二层交换机',
      img: Switch,
      ip: '192.168.1.5'
    },
  ],
  edges: [
    {
      source: '1',
      target: '2'
    },
    {
      source: '1',
      target: '3'
    }, {
      source: '1',
      target: '4'
    }, {
      source: '1',
      target: '5'
    }, {
      source: '1',
      target: '6'
    },
  ]
};