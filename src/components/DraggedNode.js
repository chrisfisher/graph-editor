// @flow

import React, { PureComponent } from 'react';
import Points from './Points';

import type GraphNode from '../reducers/graphNodes';
import type GraphPoint from '../reducers/graphPoints';

type Props = {
  node: GraphNode;
  points: GraphPoint[];
};

export default class DraggedNode extends PureComponent {
  props: Props;

  render() {
    const { x, y, width, height } = this.props.node;

    return (
      <g>
        <rect
          className='graphNode'
          x={x}
          y={y}
          style={{ width, height }}>
        </rect>
        <Points points={this.props.points} />
      </g>
    );
  }
}
