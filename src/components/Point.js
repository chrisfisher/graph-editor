// @flow

import React, { PureComponent } from 'react';
import { DraggableCore } from 'react-draggable';

const width = 8;
const height = 8;

const cursorMap = {
  '1': 'northWest',
  '2': 'west',
  '3': 'southWest',
  '4': 'north',
  '5': 'south',
  '6': 'northEast',
  '7': 'east',
  '8': 'southEast'
};

type Props = {
  pointId: string;
  cx: number;
  cy: number;
  onDragStart: (event: any, pointId: string, nodeId: string) => void;
  onDrag: (event: any, data: any, pointId: string, nodeId: string) => void;
  onDragStop: (event: any, pointId: string, nodeId: string) => void;
};

export default class Point extends PureComponent {
  props: Props;

  render() {
    const {
      pointId,
      cx,
      cy,
      onDragStart,
      onDrag,
      onDragStop
    } = this.props;

    return (
      <DraggableCore onStart={onDragStart} onDrag={onDrag} onStop={onDragStop}>
        <rect
          className={`graphPoint ${cursorMap[pointId]}`}
          x={cx - width/2}
          y={cy - height/2}
          style={{ width, height }}
        >
        </rect>
      </DraggableCore>
    );
  }
}
