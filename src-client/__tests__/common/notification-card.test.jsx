import React from 'react';
import { mount } from 'enzyme';
import NotificationCard from '../../components/common/notification-card';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = mount(<NotificationCard notification={{ isRead: false, type: 'file_removed' }} />);

    expect(tree).toMatchSnapshot();
  });
});
