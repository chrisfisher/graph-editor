import { combineReducers } from 'redux'
import graphNodes from './graphNodes'
import { default as graphPoints, getPointsForNode } from './graphPoints'
import { createSelector  } from 'reselect'

export default combineReducers({
  graphNodes,
  graphPoints
})

export function getSelectedIds(state) {
  return state.graphNodes.selectedIds
}

export function getDraggableNodes(state) {
  return state.graphNodes.orderedIds.map(x => ({
    nodeId: x,
    draggableNodeFrame: state.graphNodes.byId[x],
    graphPoints: getPointsForNode(state.graphPoints, x)
  }))
}

export function getDraggedNodes(state) {
  return state.graphNodes.draggedIds.map(x => ({
    nodeId: x,
    draggedNodeFrame: state.graphNodes.byId[x],
    graphPoints: getPointsForNode(state.graphPoints, x)
  }))
}

export function getDragDistance(state) {
  let dragDistance = state.graphNodes.dragDistance
  return {
    x: dragDistance.x || 0,
    y: dragDistance.y || 0
  }
}

export function isResizing(state) {
  return state.graphPoints.isResizing
}

export function getNode(state, nodeId) {
  return state.graphNodes.byId[nodeId]
}

export function getPointForNode(state, nodeId, pointId) {
  return state.graphPoints.byNodeId[nodeId].find(x => x.pointId === pointId)
}