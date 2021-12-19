export interface Route {
  show: boolean;
  path: string;
  name: string;
  icon?: string;
  label?: string;
  component: string;
  children?: Route[];
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
    show: true,
    path: '/settings',
    name: 'settings',
    icon: 'settings',
    label: 'تنظیمات',
    component: 'page-settings',
    action: async () => {
      await import('../pages/page-settings.js');
    },
  },
  {
    show: false,
    path: '/quran/:id',
    name: 'quran_part',
    icon: 'menu_book',
    label: 'قرآن',
    component: 'page-quran-part',
    action: async () => {
      await import('../pages/page-quran-part.js');
    },
  },
  {
    show: false,
    path: '/quran/q/:query',
    name: 'quran_search',
    icon: 'search',
    label: 'جستجو',
    component: 'page-quran-search',
    action: async () => {
      await import('../pages/page-quran-search.js');
    },
  },
  {
    show: false,
    path: '(.*)',
    name: 'not-found',
    component: 'page-not-found',
    action: async () => {
      await import('../pages/page-not-found.js');
    },
  },
];
