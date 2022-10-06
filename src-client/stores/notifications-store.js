import { types } from 'mobx-state-tree';
import Notification from '../models/notification';
import NotificationsStoreActions from './actions/notifications-store';

const NotificationsStore = types
  .model('NotificationsStore', {
    list: types.optional(types.array(Notification), []),
  })
  .views(() => ({}))
  .volatile(() => ({
    loading: false,
  }))
  .actions(NotificationsStoreActions);

export default NotificationsStore;
