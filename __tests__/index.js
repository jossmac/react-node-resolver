// @flow
import React, { Component } from 'react';
import { mount } from 'enzyme';
import NodeResolver from '../src/NodeResolver';

const noop = () => {};
const textContent = 'Some text content';
const id = 'matching-node';

// create a span to test ref equality
const span = document.createElement('span');
const content = document.createTextNode(textContent);
span.appendChild(content);
span.setAttribute('id', id);

// mock component matching the created span
class Mock extends Component {
  render () { return <span id={id}>{textContent}</span>; }
}

describe('NodeResolver', () => {
  it('should mount', () => {
    const wrapper = mount(<NodeResolver innerRef={noop}>{textContent}</NodeResolver>);

    expect(wrapper.exists()).toBe(true);
  });

  it('should pass correct innerRef', () => {
    const wrapper = mount(<NodeResolver innerRef={noop}>{textContent}</NodeResolver>);

    expect(wrapper.prop('innerRef')).toBe(noop);
  });

  it('should pass correct children', () => {
    const wrapper = mount(<NodeResolver innerRef={noop}>{textContent}</NodeResolver>);

    expect(wrapper.prop('children')).toBe(textContent);
  });

  it('should return the correct node from innerRef', () => {
    let node;

    mount(
      <NodeResolver innerRef={r => { node = r; }}>
        <Mock>{textContent}</Mock>
      </NodeResolver>
    );

    expect(node.isEqualNode(span)).toBe(true);
  });
});
