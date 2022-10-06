import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('rendering', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const tree = mount(<App />);

    expect(tree).toMatchSnapshot();
  });
});
