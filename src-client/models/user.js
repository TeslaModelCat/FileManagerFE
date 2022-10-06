import { types } from 'mobx-state-tree';

const User = types.model('User', {
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  notificationSettings: types.optional(types.string, ''),
}).views((self) => ({
  get fullName() {
    const { firstName, lastName } = self;
    return `${firstName} ${lastName}`.trim();
  },
}));

export default User;
