export const DEVICE_TYPE = {
  host: '服务器',
  'general switch': '二层交换机',
  'multifunctional switch': '三层交换机',
  router: '路由器',
};

export type TableListItem = {
  key: number;
};

export const treeData = [
  {
    title: '北校区',
    key: '0',
    children: [
      { title: '服务器', key: '0-1', isLeaf: true },
      { title: '路由器', key: '0-2', isLeaf: true },
      { title: '交换机', key: '0-3', isLeaf: true },
      { title: '防火墙', key: '0-4', isLeaf: true },
    ],
  },
  {
    title: '南校区',
    key: '1',
    children: [
      { title: '服务器', key: '1-1', isLeaf: true },
      { title: '路由器', key: '1-2', isLeaf: true },
      { title: '交换机', key: '1-3', isLeaf: true },
    ],
  },
];
