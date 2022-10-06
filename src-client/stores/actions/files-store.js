import { flow, getEnv } from 'mobx-state-tree';
import { errorToast, infoToast, successToast } from '../../toast';

const FilesStoreActions = (self) => ({
  getAll: flow(function* getAll() {
    const { api } = getEnv(self);
    self.loading = true;
    try {
      const { data } = yield api.files.getAll();
      self.list = data.files.map((file) => ({
        _id: file.id,
        name: file.name,
        url: file.url,
        size: file.size,
        createdAt: file.created_at,
      }));
    } catch (e) {
      errorToast();
      console.error(e);
    }

    self.loading = false;
  }),
  create: flow(function* create(body) {
    const { api } = getEnv(self);
    self.loading = true;
    try {
      const { data } = yield api.files.create(body);
      self.list = [...self.list, {
        _id: data.file.id,
        name: data.file.name,
        url: data.file.url,
        size: data.file.size,
        createdAt: data.file.created_at,
      }];
      successToast('File upload completed!');
    } catch (e) {
      errorToast();
      console.error(e);
    }

    self.loading = false;
  }),
  destroy: flow(function* destroy(id) {
    const { api } = getEnv(self);
    self.loading = true;
    try {
      yield api.files.destroy(id);
      self.list = self.list.filter((item) => item._id !== id);
      infoToast('File removed!');
    } catch (e) {
      errorToast();
      console.error(e);
    }

    self.loading = false;
  }),
});

export default FilesStoreActions;
