import { types } from 'mobx-state-tree';

const File = types.model('File', {
  _id: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  url: types.optional(types.string, ''),
  size: types.optional(types.string, ''),
  createdAt: types.maybe(types.string),
});

export default File;
