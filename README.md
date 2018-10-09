# React Node Resolver

A generic technique for resolving the DOM node of any react component.

[![Build Status](https://travis-ci.org/jossmac/react-node-resolver.svg?branch=master)](https://travis-ci.org/jossmac/react-node-resolver)

### Install

```bash
yarn add react-node-resolver
```

### Use

```jsx
import NodeResolver from 'react-node-resolver';

class ObfuscatedComponent extends Component {
  render() {
    return <div id="inaccessible-node" />;
  }
}

class GroovyThing extends Component {
  getNode = (ref) => {
    console.log(ref); // <div id="inaccessible-node" />
  }
  render () {
    return (
      <NodeResolver innerRef={this.getNode}>
        <ObfuscatedComponent />
      </NodeResolver>
    );
  }
}
```

### Props

| Property         | Type         | Description |
| ---------------- | ------------ | ----------- |
| `children`       | `Element`    | A single react Component |
| `innerRef`       | `ElementRef` | Callback ref `ref => this.node = ref` |
