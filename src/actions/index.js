import types from '../constants/ActionTypes'
import { v4 } from 'node-uuid'
import { 
  getDragDistance,
  isResizing,
  getNode,
  getPointForNode,
  getSelectedIds,
  getPassiveSelectedIds
} from '../reducers'

export const addNode = (width, height) => ({
  type: types.ADD_NODE,
  nodeId: v4(),
  x: 5,
  y: 5,
  width,
  height
})

export const deleteNodes = () => (dispatch, getState) => {
  dispatch({
    type: types.DELETE_NODES,
    selectedIds: getSelectedIds(getState())
  })
}

export const singleSelectNode = (nodeId) => ({
  type: types.SINGLE_SELECT_NODE,
  nodeId
})

export const multiSelectNode = (nodeId) => ({
  type: types.MULTI_SELECT_NODE,
  nodeId
})

export const clearSelectedNodes = () => ({
  type: types.CLEAR_SELECTED_NODES
})

export const dragNode = (dx, dy, nodeId) => (dispatch, getState) => {
  if (isResizing(getState())) return
  dispatch({
    type: types.DRAG_NODE,
    nodeId: nodeId,
    draggedIds: getPassiveSelectedIds(getState()),
    dx: dx,
    dy: dy
  })
}

export const stopDraggingNode = (nodeId) => (dispatch, getState) => {
  let dragDistance = getDragDistance(getState())
  dispatch({
    type: types.STOP_DRAGGING_NODE,
    nodeId: nodeId,
    draggedIds: getPassiveSelectedIds(getState()),
    dx: dragDistance.x,
    dy: dragDistance.y
  })
}

export const startDraggingPoint = (nodeId, pointId) => ({
  type: types.START_DRAGGING_POINT,
  nodeId,
  pointId
})

const minNodeWidth = 50
const minNodeHeight = 50
export const dragPoint = (nodeId, pointId, dx, dy) => (dispatch, getState) => {
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

export const stopDraggingPoint = () => ({
  type: types.STOP_DRAGGING_POINT
})

export const bringNodesToFront = () => (dispatch, getState) => {
  dispatch({
    type: types.BRING_NODES_TO_FRONT,
    selectedIds: getSelectedIds(getState())
  })
}

export const sendNodesToBack = () => (dispatch, getState) => {
  dispatch({
    type: types.SEND_NODES_TO_BACK,
    selectedIds: getSelectedIds(getState())
  })
}
