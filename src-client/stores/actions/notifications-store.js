import { flow, getEnv } from 'mobx-state-tree';

const NotificationsStoreActions = (self) => ({
  getAll: flow(function* getAll() {
    const { api } = getEnv(self);
    self.loading = true;
    try {
      const { data } = yield api.notifications.getAll();
      self.list = data.notifications.map((notification) => ({
        _id: notification.id,
        createdAt: notification.created_at,
        isRead: notification.is_read,
        type: notification.notification_type,
      }));
    } catch (e) {
      console.error(e);
    }

    self.loading = false;
  }),

  updateStatus: flow(function* updateStatus() {
    const { api } = getEnv(self);
    self.loading = true;
    try {
      yield api.notifications.updateStatus();
      self.getAll();
    } catch (e) {
      console.error(e);
    }

    self.loading = false;
  }),

  sendMailNotification: flow(function* sendMailNotification(body) {
    const { api } = getEnv(self);

    const response = yield api.notifications.sendMailNotification(body);
    const { data, status } = response;

    if (status === 200) {
      self.list = [...self.list, {
        _id: data.notification.id,
        createdAt: data.notification.created_at,
        isRead: data.notification.is_read,
        type: data.notification.notification_type,
      }];
    } else {
      return Promise.reject(response);
    }

    return self.user;
  }),
});

export default NotificationsStoreActions;
