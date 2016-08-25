import { combineReducers } from 'redux'
import graphNodes from './graphNodes'
import graphPoints, { getPointsForNode } from './graphPoints'
import { createSelector  } from 'reselect'

export default combineReducers({
  graphNodes,
  graphPoints
})

export const getSelectedIds = state => state.graphNodes.selectedIds

export const getDraggableNodes = state => {
  return state.graphNodes.orderedIds.map(x => ({
    nodeId: x,
    draggableNodeFrame: state.graphNodes.byId[x],
    graphPoints: getPointsForNode(state.graphPoints, x)
  }))
}

export const getDraggedNodes = state => {
  return state.graphNodes.draggedIds.map(x => ({
    nodeId: x,
    draggedNodeFrame: state.graphNodes.byId[x],
    graphPoints: getPointsForNode(state.graphPoints, x)
  }))
}

export const getDragDistance = state => {
  let dragDistance = state.graphNodes.dragDistance
  return {
    x: dragDistance.x || 0,
    y: dragDistance.y || 0
  }
}

export const isResizing = state => state.graphPoints.isResizing

export const getNode = (state, nodeId) => state.graphNodes.byId[nodeId]

export const getPointForNode = (state, nodeId, pointId) => state.graphPoints.byNodeId[nodeId].find(x => x.pointId === pointId)

const getNodesById = state => state.graphNodes.byId

const getSelectedId = state => state.graphNodes.selectedId

const getDraggedIds = state => state.graphNodes.draggedIds

export const getPassiveSelectedIds = createSelector(
  [getSelectedId, getSelectedIds],
  (selectedId, selectedIds) => {
    let passiveSelectedIds = [ ...selectedIds ]
    passiveSelectedIds.splice(passiveSelectedIds.indexOf(selectedId), 1)
    return passiveSelectedIds
  }
)

export const getDraggableIds = createSelector(
  [getNodesById, getDraggedIds],
  (nodesById, draggedIds) => {
    let draggableIds = Object.keys(nodesById).map(x => parseInt(x))
    draggedIds.forEach(x => {
      draggableIds.splice(draggableIds.indexOf(x), 1)
    })
    return draggableIds
  }
)