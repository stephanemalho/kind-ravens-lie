import { DashboardOutlined, ProjectOutlined, ShopOutlined } from '@ant-design/icons';
import { IResourceItem } from '@refinedev/core';

export const resources: IResourceItem[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      title: 'Dashboard',
      icon: <DashboardOutlined />,
    },
  },
  {
    name: 'compagnies',
    list: '/compagnies',
    show: '/compagnies/:id',
    create: '/compagnies/new',
    edit : '/compagnies/edit/:id',
    meta: {
      title: 'Compagnies',
      icon: <ShopOutlined />,
    },
  },
  {
    name: 'tasks',
    list: '/tasks',
    create: '/tasks/new',
    edit : '/tasks/edit/:id',
    meta: {
      title: 'Tasks',
      icon: <ProjectOutlined />,
    },
  }
];