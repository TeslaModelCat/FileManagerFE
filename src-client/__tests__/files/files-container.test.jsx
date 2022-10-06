import React from 'react';
import { mount } from 'enzyme';
import FilesContainer from '../../components/files/files-container';

jest.mock('../../stores/context', () => ({
  useStores: () => ({
    notificationStore: {
      list: [
        { _id: 'as5d4a5sd5a', isRead: true, type: 'upload-start' },
        { _id: 'as5d4a5sd5b', isRead: false, type: 'upload-finish' }
      ],
      updateStatus: jest.fn(),
      getAll: jest.fn(),
    },
    filesStore: {
      list: [
        {
          _id: 'as5d4a5sd5a',
          url: 'url',
          name: 'name',
          size: '21 Mb'
        },
      ],
      getAll: jest.fn(),
    },
    sessionStore: {
      user: {
        notificationSettings: 'instantly'
      },
    },
  })
}));

describe('rendering', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const tree = mount(<FilesContainer />);

    expect(tree).toMatchSnapshot();
  });
});
