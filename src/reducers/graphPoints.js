// @flow

import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

import type Action from 'redux';
import type Coordinates from './index';

// 1 'north-west'
// 2 'west'
// 3 'south-west'
// 4 'north'
// 5 'south'
// 6 'north-east'
// 7 'east'
// 8 'south-east'

export type GraphPointsState = {
  byNodeId: GraphPointsByNodeIdMap;
  isResizing: boolean;
};

export type GraphPoint = {
  pointId: number;
  cx: number;
  cy: number;
  axis: Coordinates;
}

export type GraphPointsByNodeIdMap = {
  [key: string]: GraphPoint[]
};

function byNodeId(state: GraphPointsByNodeIdMap = {}, action: Action): GraphPointsByNodeIdMap {
  let nextState;
  switch (action.type) {
    case actionTypes.ADD_NODE:
      return {
        ...state,
        [action.nodeId]: graphPoints(undefined, action)
      };
    case actionTypes.STOP_DRAGGING_NODE:
      nextState = { ...state };

      action.draggedIds.forEach(nodeId => {
        nextState[nodeId] = graphPoints(state[nodeId], action)
      });

      nextState[action.nodeId] = graphPoints(state[action.nodeId], action);

      return nextState
    case actionTypes.DRAG_POINT:
      return {
        ...state,
        [action.nodeId]: graphPoints(state[action.nodeId], action)
      };
    default:
      return state;
  }
}

function graphPoints(state: ?GraphPoint[], action: Action): ?GraphPoint[] {
  switch (action.type) {
    case actionTypes.ADD_NODE:
      const { x, y, width, height } = action;
      return [
        { pointId: 1, cx: x, cy: y, axis: { x: -1, y: -1 } },
        { pointId: 2, cx: x, cy: y + height/2, axis: { x: -1, y: 0 } },
        { pointId: 3, cx: x, cy: y + height, axis: { x: -1, y: 1 } },
        { pointId: 4, cx: x + width/2, cy: y, axis: { x: 0, y: -1 } },
        { pointId: 5, cx: x + width/2, cy: y + height, axis: { x: 0, y: 1 } },
        { pointId: 6, cx: x + width, cy: y, axis: { x: 1, y: -1 } },
        { pointId: 7, cx: x + width, cy: y + height/2, axis: { x: 1, y: 0 } },
        { pointId: 8, cx: x + width, cy: y + height, axis: { x: 1, y: 1 } }
      ];
    case actionTypes.STOP_DRAGGING_NODE:
    case actionTypes.DRAG_POINT:
      return state != null ? state.map(point => graphPoint(point, action)) : null;
    default:
      return state;
  }
}

function graphPoint(state: GraphPoint, action: Action): GraphPoint {
  switch (action.type) {
    case actionTypes.STOP_DRAGGING_NODE:
      return { ...state, cx: state.cx + action.dx, cy: state.cy + action.dy };
    case actionTypes.DRAG_POINT:
      let cx = state.axis.x === action.axis.x ? state.cx + (action.dx * Math.abs(action.axis.x)) : state.cx;
      let cy = state.axis.y === action.axis.y ? state.cy + (action.dy * Math.abs(action.axis.y)) : state.cy;

      if ((state.pointId === 4 || state.pointId === 5) && (action.pointId !== 4 && action.pointId !== 5)) {
        cx = cx + (action.dx / 2)
      }

      if ((state.pointId === 2 || state.pointId === 7) && (action.pointId !== 2 && action.pointId !== 7)) {
        cy = cy + (action.dy / 2)
      }

      return {
        ...state,
        cx: cx,
        cy: cy,
      };
    default:
      return state;
  }
}


function isResizing(state: boolean = false, action: Action): boolean {
  switch(action.type) {
    case actionTypes.START_DRAGGING_POINT:
      return true;
    case actionTypes.STOP_DRAGGING_POINT:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  byNodeId,
  isResizing,
});
