// @flow

import React, { PureComponent } from 'react';
import { DraggableCore } from 'react-draggable';
import Points from './Points';

import type GraphNode from '../reducers/graphNodes';
import type GraphPoint from '../reducers/graphPoints';

type Props = {
  nodeId: string;
  selected: boolean;
  node: GraphNode;
  points: GraphPoint[];
  dx: number;
  dy: number;
  onNodeDragStart: (event: any, nodeId: string) => void;
  onNodeDrag: (event: any, data: any, nodeId: string) => void;
  onNodeDragStop: (event: any, nodeId: string) => void;
  onPointDragStart: (event: any, pointId: string, nodeId: string) => void;
  onPointDrag: (event: any, data: any, pointId: string, nodeId: string) => void;
  onPointDragStop: (event: any, pointId: string, nodeId: string) => void;
}

export default class DraggableNode extends PureComponent {
  props: Props;

  render() {
    const {
      nodeId,
      selected,
      node,
      points,
      dx,
      dy,
      onNodeDragStart,
      onNodeDrag,
      onNodeDragStop,
      onPointDragStart,
      onPointDrag,
      onPointDragStop
    } = this.props;

    const { x, y, width, height } = node;

    if (selected) {
      return (
        <DraggableCore onStart={onNodeDragStart} onDrag={onNodeDrag} onStop={onNodeDragStop}>
          <g transform={`translate(${dx},${dy})`}>
            <rect
              className='graphNode'
              x={x}
              y={y}
              style={{ width, height }}
            >
            </rect>
            <Points
              points={points}
              nodeId={nodeId}
              onPointDragStart={onPointDragStart}
              onPointDrag={onPointDrag}
              onPointDragStop={onPointDragStop}
            />
          </g>
        </DraggableCore>
      );
    }

    return (
      <DraggableCore onStart={onNodeDragStart} onDrag={onNodeDrag} onStop={onNodeDragStop}>
        <rect
          className='graphNode'
          x={x}
          y={y}
          style={{ width, height }}
        >
        </rect>
      </DraggableCore>
    );
  }
}
