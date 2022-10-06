import React from 'react';
import { mount } from 'enzyme';
import { IconButton, Popper } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import SettingsPopup from '../../components/common/settings-popup';

jest.mock('../../stores/context', () => ({
  useStores: () => ({
    sessionStore: {
      user: {
        notificationSettings: 'instantly'
      },
      setNotificationSettings: new Promise((resolve) => () => resolve()),
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
    const tree = mount(<SettingsPopup />);

    expect(tree).toMatchSnapshot();
  });
});

describe('actions', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<SettingsPopup />);
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

  it('on save', (done) => {
    act(() => {
      wrapper.find(IconButton).at(0).props().onClick();
    });

    setTimeout(() => {
      act(() => {
        wrapper.find('button').at(0).props().onClick();
      });

      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find(Popper).at(0).props().open).toBeFalsy();
        done();
      }, 1000);
    }, 1000);
  });
});
