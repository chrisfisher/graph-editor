import { combineReducers } from 'redux'
import types from '../constants/ActionTypes'

// 1 'left-top'
// 2 'left-mid'
// 3 'left-bot'
// 4 'mid-top'
// 5 'mid-bot'
// 6 'right-top'
// 7 'right-mid'
// 8 'right-bot'

function graphPoint(state, action) {
  switch (action.type) {
    case types.STOP_DRAGGING_NODE:
      return { ...state, cx: state.cx + action.dx, cy: state.cy + action.dy }
    case types.DRAG_POINT:
      let cx = state.axis.x === action.axis.x ? state.cx + (action.dx * Math.abs(action.axis.x)) : state.cx
      let cy = state.axis.y === action.axis.y ? state.cy + (action.dy * Math.abs(action.axis.y)) : state.cy
      if ((state.pointId === 4 || state.pointId === 5) && (action.pointId !== 4 && action.pointId !== 5)) {
        cx = cx + (action.dx / 2)
      }
      if ((state.pointId === 2 || state.pointId === 7) && (action.pointId !== 2 && action.pointId !== 7)) {
        cy = cy + (action.dy / 2)
      }
      return {
        ...state,
        cx: cx,
        cy: cy
      }
    default:
      return state
  }
}

function graphPoints(state, action) {
  switch (action.type) {
    case types.ADD_NODE:
      const { x, y, width, height } = action
      return [
        { pointId: 1, cx: x, cy: y, axis: { x: -1, y: -1 } },
        { pointId: 2, cx: x, cy: y + height/2, axis: { x: -1, y: 0 } },
        { pointId: 3, cx: x, cy: y + height, axis: { x: -1, y: 1 } },
        { pointId: 4, cx: x + width/2, cy: y, axis: { x: 0, y: -1 } },
        { pointId: 5, cx: x + width/2, cy: y + height, axis: { x: 0, y: 1 } },
        { pointId: 6, cx: x + width, cy: y, axis: { x: 1, y: -1 } },
        { pointId: 7, cx: x + width, cy: y + height/2, axis: { x: 1, y: 0 } },
        { pointId: 8, cx: x + width, cy: y + height, axis: { x: 1, y: 1 } }
      ]
    case types.STOP_DRAGGING_NODE:
    case types.DRAG_POINT:
      return state.map(x => graphPoint(x, action))
    default:
      return state
  }
}

function byNodeId(state = {}, action) {
  switch (action.type) {
    case types.ADD_NODE:
      return {
        ...state,
        [action.nodeId]: graphPoints(undefined, action)
      }
    case types.STOP_DRAGGING_NODE:
      let newState = { ...state }
      action.draggedIds.forEach(x => {
        newState[x] = graphPoints(state[x], action)
      })
      newState[action.nodeId] = graphPoints(state[action.nodeId], action)
      return newState
    case types.DRAG_POINT:
      return {
        ...state,
        [action.nodeId]: graphPoints(state[action.nodeId], action)
      }
    default:
      return state
  }
}

function isResizing(state = false, action) {
  switch(action.type) {
    case types.START_DRAGGING_POINT: 
      return true
    case types.STOP_DRAGGING_POINT:
      return false
    default:
      return state
  }
}

export default combineReducers({
  byNodeId,
  isResizing
})

export function getPointsForNode(state, nodeId) {
  return state.byNodeId[nodeId]
}
