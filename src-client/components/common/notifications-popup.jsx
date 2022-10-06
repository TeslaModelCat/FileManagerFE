import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Grow, IconButton, Paper, Popper
} from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import { useStores } from '../../stores/context';
import NotificationCard from './notification-card';

const NotificationsPopup = () => {
  const { notificationStore } = useStores();

  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);

  const notifications = notificationStore.list;
  const unread = notifications.filter((item) => !item.isRead).length;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const listener = (event) => {
      if (
        !popperRef.current
        || popperRef.current.contains(event.target)
      ) return;
      handleClose();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [popperRef]);

  const readAll = () => {
    notificationStore.updateStatus();
  };

  return (
    <>
      <IconButton
        className="icon-btn"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-label="Uploads"
        aria-haspopup="true"
      >
        <Notifications style={{ color: 'white' }} />
        {Boolean(unread) && <div className="counter">{unread}</div>}
      </IconButton>
      <Popper
        ref={popperRef}
        open={open}
        anchorEl={buttonRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 1100 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper elevation={2}>
              <div className="notification-container">
                {notifications.length > 0 ? (
                  <>
                    <div className="notifications-list">
                      {[...notifications].reverse().map((notification) => (
                        <NotificationCard key={notification._id} notification={notification} />
                      ))}
                    </div>
                    {unread > 0 && <button type="button" className="read-all-button" onClick={readAll}>Read All</button>}
                  </>
                ) : (
                  <div className="empty">The list of notifications is still empty!</div>
                )}
              </div>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default observer(NotificationsPopup);
