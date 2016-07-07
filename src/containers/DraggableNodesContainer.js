import React from 'react'
import { connect } from 'react-redux'
import DraggableNodes from '../components/DraggableNodes'
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

let DraggableNodesContainer = ({ draggableNodes = [], selectedIds, dx, dy, onNodeDragStart, onNodeDragStop, onNodeDrag, onPointDragStart, onPointDrag, onPointDragStop }) => {
  const props = { draggableNodes, selectedIds, dx, dy, onNodeDragStart, onNodeDragStop, onNodeDrag, onPointDragStart, onPointDrag, onPointDragStop }
  return (
    <DraggableNodes { ...props } />
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
)(DraggableNodesContainer)