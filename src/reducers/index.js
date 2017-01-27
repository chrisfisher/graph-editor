// @flow

import { combineReducers } from 'redux';
import { createSelector  } from 'reselect';
import graphNodes from './graphNodes';
import graphPoints from './graphPoints';
import difference from 'lodash/difference';

import type Action from 'redux';

import type { GraphNodesState, GraphNodesByIdMap, GraphNode, Coordinates } from './graphNodes';
import type { GraphPointsState, GraphPointsByNodeIdMap, GraphPoint } from './graphPoints';

export type AppState = {
  graphNodes: GraphNodesState;
  graphPoints: GraphPointsState;
}

type AppReducer = (state: AppState, action: Action) => AppState;

const reducer: AppReducer = combineReducers({
  graphNodes,
  graphPoints,
});

export default reducer;

export type GraphNodeWithPoints = {
  nodeId: string;
  node: GraphNode;
  points: GraphPoint[];
}

export const getNodesById = (state: AppState): GraphNodesByIdMap  => state.graphNodes.byId;

export const getSelectedIds = (state: AppState): string[] => state.graphNodes.selectedIds;

export const getDraggedIds = (state: AppState): string[] => state.graphNodes.draggedIds;

export const getOrderedIds = (state: AppState): string[] => state.graphNodes.orderedIds;

export const getLastSelectedId = (state: AppState): number => state.graphNodes.lastSelectedId;

export const getDragDistance = (state: AppState): Coordinates => state.graphNodes.dragDistance;

export const isResizing = (state: AppState): boolean => state.graphPoints.isResizing;

export const getPointsByNodeId = (state: AppState): GraphPointsByNodeIdMap => state.graphPoints.byNodeId;

export const getNode = (state: AppState, nodeId: string) =>
  getNodesById(state)[nodeId];

export const getPointForNode = (state: AppState, nodeId: string, pointId: string) =>
  getPointsByNodeId(state)[nodeId].find(x => x.pointId === pointId);

export const getPreviousSelectedIds = createSelector(
  [getSelectedIds, getLastSelectedId],
  (selectedIds, lastSelectedId) =>
    [...selectedIds].filter(selectedId => selectedId !== lastSelectedId)
);

export const getDraggableIds = createSelector(
  [getOrderedIds, getDraggedIds],
  (orderedIds, draggedIds) => difference(orderedIds, draggedIds)
);

export const getDraggableNodes = createSelector(
  [getDraggableIds, getNodesById, getPointsByNodeId],
  (draggableIds, nodesById, pointsByNodeId) =>
    draggableIds.map((nodeId: string): GraphNodeWithPoints => ({
      nodeId: nodeId,
      node: nodesById[nodeId],
      points: pointsByNodeId[nodeId],
    }))
);

export const getDraggedNodes = createSelector(
  [getDraggedIds, getNodesById, getPointsByNodeId],
  (draggedIds, nodesById, pointsByNodeId) =>
    draggedIds.map((nodeId: string): GraphNodeWithPoints => ({
      nodeId: nodeId,
      node: nodesById[nodeId],
      points: pointsByNodeId[nodeId],
    }))
);
