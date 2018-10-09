// @flow
import React, { Component } from 'react';
import { mount } from 'enzyme';
import NodeResolver from '../src/index';

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
  render () { return <span id={id}>{this.props.text || textContent}</span>; }
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
        <Mock />
      </NodeResolver>
    );

    expect(node.isEqualNode(span)).toBe(true);
  });

  it('should update innerRef if children change', () => {
    const innerRefSpy = jest.fn();
    const wrapper = mount(
      <NodeResolver innerRef={innerRefSpy}>{textContent}</NodeResolver>
    );
    expect(innerRefSpy).toHaveBeenCalledTimes(1);

    wrapper.setProps({ children: 'AnotherText' });
    wrapper.update();

    expect(innerRefSpy).toHaveBeenCalledTimes(2);
    expect(wrapper.text()).toEqual('AnotherText');
  });

  it('should remove reference if component is unmounted', () => {
    const innerRefSpy = jest.fn();
    const wrapper = mount(
      <NodeResolver innerRef={innerRefSpy}>{textContent}</NodeResolver>
    );
    expect(innerRefSpy).toHaveBeenCalledTimes(1);

    wrapper.unmount();

    expect(innerRefSpy).toHaveBeenCalledTimes(2);
    expect(innerRefSpy.mock.calls[1][0]).toEqual(null);
  });
});
