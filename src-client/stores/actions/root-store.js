import { flow } from 'mobx-state-tree';

const RootStoreActions = (self) => ({
  restore: flow(function* restore() {
    yield self.sessionStore.restore();
  }),
});

export default RootStoreActions;
