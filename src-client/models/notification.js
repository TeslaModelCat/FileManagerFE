import { types } from 'mobx-state-tree';

const Notification = types.model('Notification', {
  _id: types.optional(types.string, ''),
  isRead: types.maybeNull(types.boolean),
  type: types.optional(types.string, ''),
  createdAt: types.maybe(types.string),
});

export default Notification;
