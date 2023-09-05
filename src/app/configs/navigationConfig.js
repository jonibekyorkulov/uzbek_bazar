import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards.analytics',
    title: 'Analytics',
    type: 'item',
    icon: 'heroicons-outline:chart-pie',
    url: '/dashboards/analytics',
  },
  {
    id: 'apps.ecommerce',
    title: 'ECommerce',
    type: 'collapse',
    icon: 'heroicons-outline:shopping-cart',
    translate: 'ECOMMERCE',
    children: [
      {
        id: 'e-commerce-products',
        title: 'Products',
        type: 'item',
        url: 'apps/e-commerce/products',
        end: true,
      },
      {
        id: 'e-commerce-new-product',
        title: 'New Product',
        type: 'item',
        url: 'apps/e-commerce/products/new',
      },
      {
        id: 'e-commerce-orders',
        title: 'Orders',
        type: 'item',
        url: 'apps/e-commerce/orders',
        end: true,
      },
    ],
  },
  {
    id: 'apps.calendar',
    title: 'Calendar',
    type: 'item',
    icon: 'heroicons-outline:calendar',
    url: '/apps/calendar',
    translate: 'CALENDAR',
  },
  {
    id: 'apps.chat',
    title: 'Chat',
    type: 'item',
    icon: 'heroicons-outline:chat-alt',
    url: '/apps/chat',
    translate: 'CHAT',
  },
  {
    id: 'apps.contacts',
    title: 'Contacts',
    type: 'item',
    icon: 'heroicons-outline:user-group',
    url: '/apps/contacts',
    translate: 'CONTACTS',
  },
];

export default navigationConfig;
