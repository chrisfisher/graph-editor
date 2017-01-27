// @flow

import React, { PureComponent } from 'react';
import Point from './Point';

import type GraphPoint from '../reducers/graphPoints';

type Props = {
  graphPoints: GraphPoint[];
  nodeId: string;
  onPointDragStart: (event: any, pointId: string, nodeId: string) => void;
  onPointDrag: (event: any, data: any, pointId: string, nodeId: string) => void;
  onPointDragStop: (event: any, pointId: string, nodeId: string) => void;
};

export default class Points extends PureComponent {
  render() {
    const {
      points,
      nodeId,
      onPointDragStart,
      onPointDrag,
      onPointDragStop
    } = this.props;

    return (
      <g>
        {points.map(x => (
          <Point
            key={nodeId + '-' + x.pointId}
            pointId={x.pointId}
            cx={x.cx}
            cy={x.cy}
            onDragStart={event => onPointDragStart(event, x.pointId, nodeId )}
            onDrag={(event, data) => onPointDrag(event, data, x.pointId, nodeId )}
            onDragStop={event => onPointDragStop(event, x.pointId, nodeId )}
          />
        ))}
      </g>
    );
  }
}
