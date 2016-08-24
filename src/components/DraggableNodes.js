import React from 'react'
import { connect } from 'react-redux'
import DraggableNode from './DraggableNode'
import { getDraggableNodes, getSelectedIds, getDragDistance } from '../reducers'
import {
  singleSelectNode,
  multiSelectNode,
  dragNode,
  stopDraggingNode,
  startDraggingPoint,
  dragPoint,
  stopDraggingPoint
} from '../actions'

const DraggableNodes = ({ draggableNodes, selectedIds, dx, dy, onNodeDragStart, onNodeDragStop, onNodeDrag, onPointDragStart, onPointDrag, onPointDragStop }) => {  
  return (
    <g>
      {draggableNodes.map(x => (
        <DraggableNode
          key={x.nodeId}
          nodeId={x.nodeId}
          selected={selectedIds.indexOf(x.nodeId) >= 0}
          draggableNodeFrame={x.draggableNodeFrame}  
          graphPoints={x.graphPoints}
          dx={dx}
          dy={dy}
          onNodeDragStart={(event) => onNodeDragStart(event, x.nodeId)}          
          onNodeDrag={(event, data) => onNodeDrag(event, data, x.nodeId)}
          onNodeDragStop={(event) => onNodeDragStop(event, x.nodeId)}
          onPointDragStart={onPointDragStart}
          onPointDrag={onPointDrag}
          onPointDragStop={onPointDragStop} />
        )
      )}
    </g>
  )
}

const mapStateToProps = (state) => {
  let {x, y} = getDragDistance(state)
  return {
    draggableNodes: getDraggableNodes(state),
    selectedIds: getSelectedIds(state),
    dx: x,
    dy: y
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggableNodes)