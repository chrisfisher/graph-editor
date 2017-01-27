// @flow

import { v4 } from 'node-uuid';
import * as actionTypes from '../constants/actionTypes';

import {
  getDragDistance,
  isResizing,
  getOrderedIds,
  getSelectedIds,
  getPreviousSelectedIds,
  getNode,
  getPointForNode,
} from '../reducers';

import type Action from 'redux';
import type AppState from '../reducers';
import type GraphNode from '../reducers/graphNodes';
import type GraphPoint from '../reducers/graphPoints';

type Dispatch = (action: Action) => void;
type GetState = () => AppState;

export const addNode = (width: number, height: number) => ({
  type: actionTypes.ADD_NODE,
  nodeId: v4(),
  x: 5,
  y: 5,
  width,
  height,
});

export const deleteNodes = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch({
    type: actionTypes.DELETE_NODES,
    selectedIds: getSelectedIds(getState()),
  })
};

export const singleSelectNode = (nodeId: string) => ({
  type: actionTypes.SINGLE_SELECT_NODE,
  nodeId,
});

export const multiSelectNode = (nodeId: string) => ({
  type: actionTypes.MULTI_SELECT_NODE,
  nodeId,
});

export const clearSelectedNodes = () => ({
  type: actionTypes.CLEAR_SELECTED_NODES,
});

export const dragNode = (dx: number, dy: number, nodeId: string) => (dispatch: Dispatch, getState: GetState) => {
  if (isResizing(getState())) return;
  dispatch({
    type: actionTypes.DRAG_NODE,
    nodeId: nodeId,
    draggedIds: getPreviousSelectedIds(getState()),
    dx: dx,
    dy: dy,
  });
};

export const stopDraggingNode = (nodeId: string) => (dispatch: Dispatch, getState: GetState) => {
  const { x, y } = getDragDistance(getState());
  dispatch({
    type: actionTypes.STOP_DRAGGING_NODE,
    nodeId: nodeId,
    draggedIds: getPreviousSelectedIds(getState()),
    dx: x,
    dy: y,
  });
};

export const startDraggingPoint = (nodeId: string, pointId: string) => ({
  type: actionTypes.START_DRAGGING_POINT,
  nodeId,
  pointId,
});

const minNodeWidth = 50;
const minNodeHeight = 50;
export const dragPoint = (nodeId: string, pointId: string, dx: number, dy: number) => (dispatch: Dispatch, getState: GetState) => {
  const node: GraphNode = getNode(getState(), nodeId);
  const point: GraphPoint = getPointForNode(getState(), nodeId, pointId);

  if (node.width <= minNodeWidth && (point.axis.x * dx < 0)) return;
  if (node.height <= minNodeHeight && (point.axis.y * dy < 0)) return;

  dispatch({
    type: actionTypes.DRAG_POINT,
    nodeId: nodeId,
    pointId: pointId,
    dx: dx,
    dy: dy,
    axis: point.axis,
  });
}

export const stopDraggingPoint = () => ({
  type: actionTypes.STOP_DRAGGING_POINT,
});

export const bringNodesToFront = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch({
    type: actionTypes.BRING_NODES_TO_FRONT,
    selectedIds: getSelectedIds(getState()),
  });
};

export const sendNodesToBack = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch({
    type: actionTypes.SEND_NODES_TO_BACK,
    selectedIds: getSelectedIds(getState()),
  });
};

export const addManyNodes = (width: number, height: number) => (dispatch: Dispatch, getState: GetState) => {
  let x = 5;
  let y = 5;

  for (let i = 0; i < 99; i++) {
    dispatch({
      type: actionTypes.ADD_NODE,
      nodeId: v4(),
      x: x,
      y: y,
      width,
      height,
    });

    x += 5;
    y += 5;
  }
};

export const selectAllNodes = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch({
    type: actionTypes.SELECT_ALL_NODES,
    allNodeIds: getOrderedIds(getState()),
  });
};
