export interface Route {
  show: boolean;
  path: string;
  name: string;
  icon: string | null;
  label: {
    fa: string | null;
    en: string | null;
  };
  component: string;
  action: () => Promise<void>;
}

export const routes: Route[] = [
  {
    show: true,
    path: '/',
    name: 'home',
    icon: 'home-outline',
    label: {
      fa: 'خانه',
      en: 'home',
    },
    component: 'page-home',
    action: async () => {
      await import('../pages/page-home.js');
    },
  },
  {
    show: true,
    path: '/about',
    name: 'about',
    icon: 'information-circle-outline',
    label: {
      fa: 'درباره ما',
      en: 'about us',
    },
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
    label: {
      fa: null,
      en: null,
    },
    component: 'page-not-found',
    action: async () => {
      await import('../pages/page-not-found.js');
    },
  },
];
