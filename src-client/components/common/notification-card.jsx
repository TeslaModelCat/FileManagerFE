import React from 'react';
import PropTypes from 'prop-types';
import { getMessage } from '../../helpers';

const NotificationCard = ({ notification }) => (
  <div className={`notification-card ${!notification.isRead && 'unread'}`}>
    <div className="message">{getMessage(notification.type)}</div>
    <div className="marker" />
  </div>
);

NotificationCard.propTypes = {
  notification: PropTypes.instanceOf(Object).isRequired,
};

export default NotificationCard;
