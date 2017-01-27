// @flow

import { combineReducers } from 'redux';
import difference from 'lodash/difference';
import * as actionTypes from '../constants/actionTypes';

import type Action from 'redux';

export type GraphNodesState = {
  byId: GraphNodesByIdMap;
  orderedIds: string[];
  selectedIds: string[];
  lastSelectedId: number;
  draggedIds: string[];
  dragDistance: Coordinates;
};

export type GraphNode = {
  x: string;
  y: string;
  width: string;
  height: string;
};

export type GraphNodesByIdMap = {
  [key: string]: GraphNode
};

export type Coordinates = {
  x: number;
  y: number;
}

function byId(state: GraphNodesByIdMap = {}, action: Action): GraphNodesByIdMap {
  let nextState;
  switch (action.type) {
    case actionTypes.ADD_NODE:
      return {
        ...state,
        [action.nodeId]: graphNode(state[action.nodeId], action)
      }
    case actionTypes.STOP_DRAGGING_NODE:
      nextState = { ...state };
      action.draggedIds.forEach(x => {
        nextState[x] = graphNode(state[x], action);
      });
      nextState[action.nodeId] = graphNode(state[action.nodeId], action);
      return nextState;
    case actionTypes.DRAG_POINT:
      return {
        ...state,
        [action.nodeId]: graphNode(state[action.nodeId], action)
      };
    case actionTypes.DELETE_NODES:
      nextState = { ...state }
      action.selectedIds.forEach(x => {
        delete nextState[x]
      });
      return nextState;
    default:
      return state;
  }
}

function graphNode(state: GraphNode, action: Action): GraphNode {
  switch (action.type) {
    case actionTypes.ADD_NODE:
      return {
        x: action.x,
        y: action.y,
        width: action.width,
        height: action.height
      };
    case actionTypes.STOP_DRAGGING_NODE:
      return { ...state, x: state.x + action.dx, y: state.y + action.dy };
    case actionTypes.DRAG_POINT:
      return {
        ...state,
        x: state.x + (action.axis.x < 0 ? action.dx : 0),
        y: state.y + (action.axis.y < 0 ? action.dy : 0),
        width: state.width + (action.dx * action.axis.x),
        height: state.height + (action.dy * action.axis.y)
      };
    default:
      return state;
  }
}

function orderedIds(state: string[] = [], action: Action): string[] {
  switch(action.type) {
    case actionTypes.ADD_NODE:
      return [ ...state, action.nodeId ];
    case actionTypes.DELETE_NODES:
      return difference(state, action.selectedIds);
    case actionTypes.BRING_NODES_TO_FRONT:
      return difference(state, action.selectedIds).concat(action.selectedIds);
    case actionTypes.SEND_NODES_TO_BACK:
      return action.selectedIds.concat(difference(state, action.selectedIds));
    default:
      return state;
  }
}

function lastSelectedId(state: number = 0, action: Action): number {
  switch(action.type) {
    case actionTypes.SINGLE_SELECT_NODE:
      return action.nodeId;
    case actionTypes.MULTI_SELECT_NODE:
      return action.nodeId;
    case actionTypes.CLEAR_SELECTED_NODES:
    case actionTypes.DELETE_NODES:
      return 0;
    default:
      return state;
  }
}

function selectedIds(state: string[] = [], action: Action): string[] {
  switch(action.type) {
    case actionTypes.SINGLE_SELECT_NODE:
      return state.indexOf(action.nodeId) >= 0 ?
        state :
        [ action.nodeId ];
    case actionTypes.MULTI_SELECT_NODE:
      return state.indexOf(action.nodeId) < 0 ?
        [ ...state, action.nodeId ] :
        state;
    case actionTypes.SELECT_ALL_NODES:
      return [ ...action.allNodeIds ];
    case actionTypes.CLEAR_SELECTED_NODES:
    case actionTypes.DELETE_NODES:
      return [];
    default:
      return state;
  }
}

function draggedIds(state: string[] = [], action: Action): string[] {
  switch(action.type) {
    case actionTypes.DRAG_NODE:
      return state.length ?
        state :
        [ ...action.draggedIds ];
    case actionTypes.STOP_DRAGGING_NODE:
      return [];
    default:
      return state;
  }
}

function dragDistance(state: Coordinates = { x: 0, y: 0 }, action: Action): Coordinates {
  switch(action.type) {
    case actionTypes.DRAG_NODE:
      return {
        x: state.x + action.dx,
        y: state.y + action.dy
      };
    case actionTypes.STOP_DRAGGING_NODE:
      return { x: 0, y: 0 };
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  orderedIds,
  selectedIds,
  lastSelectedId,
  draggedIds,
  dragDistance,
});
