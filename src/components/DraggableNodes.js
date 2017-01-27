// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DraggableNode from './DraggableNode';
import { getDraggableNodes, getSelectedIds, getDragDistance } from '../reducers';

import {
  singleSelectNode,
  multiSelectNode,
  dragNode,
  stopDraggingNode,
  startDraggingPoint,
  dragPoint,
  stopDraggingPoint
} from '../actions';

import type GraphNodeWithPoints from '../reducers';

type Props = {
  draggableNodes: GraphNodeWithPoints[];
  selectedIds: string[];
  dx: number;
  dy: number;
  onNodeDragStart: (event: any) => void;
  onNodeDrag: (event: any, data: any) => void;
  onNodeDragStop: (event: any) => void;
  onPointDragStart: (event: any, pointId: string, nodeId: string) => void;
  onPointDrag: (event: any, data: any, pointId: string, nodeId: string) => void;
  onPointDragStop: (event: any, pointId: string, nodeId: string) => void;
};

class DraggableNodes extends PureComponent {
  props: Props;

  render() {
    const {
      draggableNodes,
      selectedIds,
      dx,
      dy,
      onNodeDragStart,
      onNodeDragStop,
      onNodeDrag,
      onPointDragStart,
      onPointDrag,
      onPointDragStop
    } = this.props;

    return (
      <g>
        {draggableNodes.map((nodeWithPoints: GraphNodeWithPoints) =>
          <DraggableNode
            key={nodeWithPoints.nodeId}
            nodeId={nodeWithPoints.nodeId}
            node={nodeWithPoints.node}
            points={nodeWithPoints.points}
            selected={selectedIds.indexOf(nodeWithPoints.nodeId) >= 0}
            dx={dx}
            dy={dy}
            onNodeDragStart={event => onNodeDragStart(event, nodeWithPoints.nodeId)}
            onNodeDrag={(event, data) => onNodeDrag(event, data, nodeWithPoints.nodeId)}
            onNodeDragStop={event => onNodeDragStop(event, nodeWithPoints.nodeId)}
            onPointDragStart={onPointDragStart}
            onPointDrag={onPointDrag}
            onPointDragStop={onPointDragStop}
          />
        )}
      </g>
    );
  }
};

const mapStateToProps = state => {
  const { x, y } = getDragDistance(state);
  return {
    draggableNodes: getDraggableNodes(state),
    selectedIds: getSelectedIds(state),
    dx: x,
    dy: y,
  };
}

const mapDispatchToProps = dispatch => ({
  onNodeDragStart: (event, nodeId) => {
    if (event.shiftKey) {
      dispatch(multiSelectNode(nodeId))
    } else {
      dispatch(singleSelectNode(nodeId))
    }
  },
  onNodeDrag: (event, data, nodeId) => {
    dispatch(dragNode(data.position.deltaX, data.position.deltaY, nodeId))
  },
  onNodeDragStop: (event, nodeId) => {
    dispatch(stopDraggingNode(nodeId))
  },
  onPointDragStart: (event, pointId, nodeId) => {
    dispatch(startDraggingPoint(nodeId, pointId))
  },
  onPointDrag: (event, data, pointId, nodeId) => {
    dispatch(dragPoint(nodeId, pointId, data.position.deltaX, data.position.deltaY))
  },
  onPointDragStop: (event, pointId, nodeId) => {
    dispatch(stopDraggingPoint(nodeId, pointId))
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggableNodes);
