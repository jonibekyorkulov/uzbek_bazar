import { memo } from 'react';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';
import NotificationPanel from '../../shared-components/notificationPanel/NotificationPanel';
import ChatPanel from 'app/theme-layouts/shared-components/chatPanel/ChatPanel';

function RightSideLayout1(props) {
  return (
    <>
    <ChatPanel />
      <QuickPanel />

      <NotificationPanel />
    </>
  );
}

export default memo(RightSideLayout1);
