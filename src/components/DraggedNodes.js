// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DraggedNode from './DraggedNode';
import { getDraggedNodes, getDragDistance } from '../reducers';

import type GraphNodeWithPoints from '../reducers';

type Props = {
  draggedNodes: GraphNodeWithPoints[];
  dx: number;
  dy: number;
};

class DraggedNodes extends PureComponent {
  props: Props;

  render() {
    const { draggedNodes, dx, dy } = this.props;

    return (
      <g transform={`translate(${dx},${dy})`}>
        {draggedNodes.map((nodeWithPoints: GraphNodeWithPoints) =>
          <DraggedNode
            key={nodeWithPoints.nodeId}
            node={nodeWithPoints.node}
            points={nodeWithPoints.points}
          />
        )}
      </g>
    );
  }
}

const mapStateToProps = state => {
  const { x, y } = getDragDistance(state);
  return {
    draggedNodes: getDraggedNodes(state),
    dx: x,
    dy: y,
  };
};

export default connect(
  mapStateToProps
)(DraggedNodes);
