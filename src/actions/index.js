import { getPassiveSelectedIds } from '../selectors'
import { getDragDistance, isResizing, getNode, getPointForNode, getSelectedIds } from '../reducers'
import types from '../constants/ActionTypes'

let nextNodeId = 1
let offset = 5
export function addNode(width, height) {
  offset = offset+5
  return {
    type: types.ADD_NODE,
    nodeId: nextNodeId++,
    x: offset,
    y: offset,
    width,
    height
  }
}

export function deleteNodes() {
  return (dispatch, getState) => {	
    dispatch({
      type: types.DELETE_NODES,
      selectedIds: getSelectedIds(getState())
    })
  }
}

export function singleSelectNode(nodeId) {
  return {
    type: types.SINGLE_SELECT_NODE,
    nodeId
  }
}

export function multiSelectNode(nodeId) {
  return {
    type: types.MULTI_SELECT_NODE,
    nodeId
  }
}

export function clearSelectedNodes() {
  return {
    type: types.CLEAR_SELECTED_NODES
  }
}

export function dragNode(dx, dy, nodeId) {
  return (dispatch, getState) => {
    if (isResizing(getState())) return
    dispatch({
      type: types.DRAG_NODE,
      nodeId: nodeId,
      draggedIds: getPassiveSelectedIds(getState()),
      dx: dx,
      dy: dy
    })
  }
}

export function stopDraggingNode(nodeId) {
  return (dispatch, getState) => {
    let dragDistance = getDragDistance(getState())
    dispatch({
      type: types.STOP_DRAGGING_NODE,
      nodeId: nodeId,
      draggedIds: getPassiveSelectedIds(getState()),
      dx: dragDistance.x,
      dy: dragDistance.y
    })
  }
}

export function startDraggingPoint(nodeId, pointId) {
  return {
    type: types.START_DRAGGING_POINT,
    nodeId,
    pointId
  }
}

const minNodeWidth = 50
const minNodeHeight = 50
export function dragPoint(nodeId, pointId, dx, dy) {
  return (dispatch, getState) => {
    let node = getNode(getState(), nodeId)
    let point = getPointForNode(getState(), nodeId, pointId)
    if (node.width <= minNodeWidth && (point.axis.x * dx < 0)) return
    if (node.height <= minNodeHeight && (point.axis.y * dy < 0)) return
    dispatch({
      type: types.DRAG_POINT,
      nodeId: nodeId,
      pointId: pointId,
      dx: dx,
      dy: dy,
      axis: point.axis
    })
  }
}

export function stopDraggingPoint() {
  return {
    type: types.STOP_DRAGGING_POINT
  }
}


export function bringNodesToFront() {
  return (dispatch, getState) => {	
    dispatch({
      type: types.BRING_NODES_TO_FRONT,
      selectedIds: getSelectedIds(getState())
    })
  }
}

export function sendNodesToBack() {
  return (dispatch, getState) => {	
    dispatch({
      type: types.SEND_NODES_TO_BACK,
      selectedIds: getSelectedIds(getState())
    })
  }
}
