import { types } from 'mobx-state-tree';
import { configure } from 'mobx';
import RootStoreActions from './actions/root-store';

import SessionStore from './session-store';
import FilesStore from './files-store';
import NotificationsStore from './notifications-store';

import api from '../api/api';

configure({});

const RootStore = types
  .model('RootStore', {
    sessionStore: types.optional(SessionStore, () => SessionStore.create({})),
    filesStore: types.optional(FilesStore, () => FilesStore.create({})),
    notificationStore: types.optional(NotificationsStore, () => NotificationsStore.create({})),
  }).actions(RootStoreActions);

const RootStoreInstance = RootStore.create({}, { api });

export { RootStoreInstance as default, RootStore };
