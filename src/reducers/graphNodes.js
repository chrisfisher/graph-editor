import { combineReducers } from 'redux'
import _ from 'lodash' 
import types from '../constants/ActionTypes'

function graphNodes(state, action) {
  switch (action.type) {
    case types.ADD_NODE:
      return {
        x: action.x,
        y: action.y,
        width: action.width,
        height: action.height
      }
    case types.STOP_DRAGGING_NODE:
      return { ...state, x: state.x + action.dx, y: state.y + action.dy }
    case types.DRAG_POINT:
      return {
        ...state,
        x: state.x + (action.axis.x < 0 ? action.dx : 0),
        y: state.y + (action.axis.y < 0 ? action.dy : 0),
        width: state.width + (action.dx * action.axis.x),
        height: state.height + (action.dy * action.axis.y)
      }
    default:
      return state
  }
}

function byId(state = {}, action) {
  let newState
  switch (action.type) {
    case types.ADD_NODE:
      return {
        ...state,
        [action.nodeId]: graphNodes(state[action.nodeId], action)
      }
    case types.STOP_DRAGGING_NODE:
      newState = { ...state }
      action.draggedIds.forEach(x => {
        newState[x] = graphNodes(state[x], action)
      })
      newState[action.nodeId] = graphNodes(state[action.nodeId], action)
      return newState
    case types.DRAG_POINT:
      return {
        ...state,
        [action.nodeId]: graphNodes(state[action.nodeId], action)
      }
    case types.DELETE_NODES:
      newState = { ...state }
      action.selectedIds.forEach(x => {
        delete newState[x]
      })
      return newState
    default:
      return state
  }
}

function orderedIds(state = [], action) {
  switch(action.type) {
    case types.ADD_NODE:
      return [ ...state, action.nodeId ]
    case types.DELETE_NODES:
      return _.difference(state, action.selectedIds)
    case types.BRING_NODES_TO_FRONT:
      return _.difference(state, action.selectedIds).concat(action.selectedIds)
    case types.SEND_NODES_TO_BACK:
      return action.selectedIds.concat(_.difference(state, action.selectedIds))
    default:
      return state
  }
}

function selectedId(state = 0, action) {
  switch(action.type) {
    case types.SINGLE_SELECT_NODE:
      return action.nodeId
    case types.MULTI_SELECT_NODE:
      return action.nodeId
    case types.CLEAR_SELECTED_NODES:
    case types.DELETE_NODES:
      return 0
    default:
      return state
  }
}

function selectedIds(state = [], action) {
  switch(action.type) {
    case types.SINGLE_SELECT_NODE:
      return state.indexOf(action.nodeId) >= 0 
        ? state
        : [ action.nodeId ]
    case types.MULTI_SELECT_NODE:
      return state.indexOf(action.nodeId) < 0
        ? [ ...state, action.nodeId ]
        : state
    case types.CLEAR_SELECTED_NODES:
    case types.DELETE_NODES:
      return []
    default:
      return state
  }
}

function draggedIds(state = [], action) {
  switch(action.type) {
    case types.DRAG_NODE:
      return state.length
        ? state
        : [ ...action.draggedIds ]
    case types.STOP_DRAGGING_NODE:
      return []
    default:
      return state
  }
}

function dragDistance(state = { x: 0, y: 0 }, action) {
  switch(action.type) {
    case types.DRAG_NODE:
      return {
        x: state.x + action.dx,
        y: state.y + action.dy
      }
    case types.STOP_DRAGGING_NODE:
      return { x: 0, y: 0 }
    default:
      return state
  }
}

export default combineReducers({
  byId,
  orderedIds,
  selectedId,
  selectedIds,
  draggedIds,
  dragDistance
})
