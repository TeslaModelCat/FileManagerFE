import { flow, getEnv } from 'mobx-state-tree';

const SessionStoreActions = (self) => ({
  restore: flow(function* restore() {
    const { api } = getEnv(self);

    const token = window.localStorage.getItem('token');
    if (!token) {
      self.user = null;
      return;
    }

    try {
      const { data } = yield api.auth.me();
      self.user = {
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        notificationSettings: data.user.notification_settings,
      };
    } catch (e) {
      console.error(e);
      self.user = null;
    }
  }),

  saveAuthToken(token) {
    window.localStorage.setItem('token', token);
  },

  deleteAuthToken() {
    window.localStorage.removeItem('token');
  },

  login: flow(function* login(body) {
    const { api } = getEnv(self);

    const response = yield api.auth.login(body);
    const { data, status, headers } = response;

    if (status === 200 && data.user) {
      self.saveAuthToken(headers.authorization);
      self.user = {
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        notificationSettings: data.user.notification_settings,
      };
    } else if (status === 401) {
      return data;
    } else {
      return Promise.reject(response);
    }

    return self.user;
  }),

  register: flow(function* register(body) {
    const { api } = getEnv(self);

    const response = yield api.auth.register(body);
    const { data, status, headers } = response;

    if (status === 200 && data.user) {
      self.saveAuthToken(headers.authorization);
      self.user = {
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        notificationSettings: data.user.notification_settings,
      };
    } else {
      return Promise.reject(response);
    }

    return self.user;
  }),

  setNotificationSettings: flow(function* setNotificationSettings(body) {
    const { api } = getEnv(self);

    const response = yield api.profile.setNotificationSettings(body);
    const { status } = response;

    if (status === 200) {
      self.user = { ...self.user, notificationSettings: body.settings };
    } else {
      return Promise.reject(response);
    }

    return self.user;
  }),

  logout: flow(function* logout() {
    const { api } = getEnv(self);

    const { status } = yield api.auth.logout();
    if (status === 200) {
      self.user = null;
      self.deleteAuthToken();
      window.location.replace('/sign_in');
    }
  })
});

export default SessionStoreActions;
