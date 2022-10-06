import React from 'react';
import { mount } from 'enzyme';
import SignIn from '../../components/auth/sign-in';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = mount(<SignIn />);

    expect(tree).toMatchSnapshot();
  });
});
