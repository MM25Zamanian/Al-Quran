export interface Route {
  show: boolean;
  path: string;
  name: string;
  icon: string | null;
  label: string | null;
  component: string;
  action: () => Promise<void>;
}

export const routes: Route[] = [
  {
    show: true,
    path: '/',
    name: 'home',
    icon: 'home',
    label: 'خانه',
    component: 'page-home',
    action: async () => {
      await import('../pages/page-home.js');
    },
  },
  {
    show: true,
    path: '/about',
    name: 'about',
    icon: 'info',
    label: 'درباره ما',
    component: 'page-about',
    action: async () => {
      await import('../pages/page-about.js');
    },
  },
  {
    show: false,
    path: '(.*)',
    name: 'not-found',
    icon: null,
    label: null,
    component: 'page-not-found',
    action: async () => {
      await import('../pages/page-not-found.js');
    },
  },
];
