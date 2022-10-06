import React from 'react';
import { mount } from 'enzyme';
import { IconButton, Popper } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import NotificationsPopup from '../../components/common/notifications-popup';

jest.mock('../../stores/context', () => ({
  useStores: () => ({
    notificationStore: {
      list: [
        { _id: 'as5d4a5sd5a', isRead: true, type: 'upload-start' },
        { _id: 'as5d4a5sd5b', isRead: false, type: 'upload-finish' }
      ],
      updateStatus: jest.fn(),
    }
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
    const tree = mount(<NotificationsPopup />);

    expect(tree).toMatchSnapshot();
  });
});

describe('actions', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<NotificationsPopup />);
  });

  it('popup open', (done) => {
    act(() => {
      wrapper.find(IconButton).at(0).props().onClick();
    });

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(Popper).at(0).props().open).toBeTruthy();
      done();
    }, 1000);
  });
});
