import './api/auth-api';
import './api/dashboards/analytics-api';
import './api/ecommerce-api';
import './api/calendar-api';
import './api/chat-api';
import './api/contacts-api';
import './api/profile-api';




import './api/notifications-api';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
