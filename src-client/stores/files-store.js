import { types } from 'mobx-state-tree';
import File from '../models/file';
import FilesStoreActions from './actions/files-store';

const FilesStore = types
  .model('FilesStore', {
    list: types.optional(types.array(File), []),
  })
  .views(() => ({}))
  .volatile(() => ({
    loading: false,
  }))
  .actions(FilesStoreActions);

export default FilesStore;
