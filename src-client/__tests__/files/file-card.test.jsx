import React from 'react';
import { mount } from 'enzyme';
import FileCard from '../../components/files/file-card';
import {IconButton} from "@material-ui/core";

const defaultProps = {
  file: {
    url: 'url',
    name: 'name',
    size: '21 Mb'
  },
  onDelete: jest.fn(),
};

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = mount(<FileCard {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});

describe('actions', () => {
  it('on delete', () => {
    const wrapper = mount(<FileCard {...defaultProps} />);
    wrapper.find(IconButton).at(0).props().onClick();

    expect(defaultProps.onDelete).toHaveBeenCalled();
  });
});
