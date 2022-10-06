import { types } from 'mobx-state-tree';
import User from '../models/user';
import SessionStoreActions from './actions/session-store';

const SessionStore = types
  .model('SessionStore', {
    user: types.maybeNull(User),
  })
  .views((self) => ({
    get isAuthenticated() {
      return Boolean(self.user);
    },
  })).actions(SessionStoreActions);

export default SessionStore;
