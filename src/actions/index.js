import { 
  ADD_GRAPH_NODE,
  SINGLE_SELECT_GRAPH_NODE,
  MULTI_SELECT_GRAPH_NODE,
  CLEAR_SELECTED_GRAPH_NODES,
  STOP_DRAGGING_GRAPH_NODES,
  DRAG_GRAPH_NODES
} from '../constants/ActionTypes'

let nextGraphNodeId = 0
export const addGraphNode = (x,y) => {
  return {
    type: ADD_GRAPH_NODE,
    id: nextGraphNodeId++,
    x,
    y
  }
}

export const singleSelectGraphNode = (id) => {
  return {
    type: SINGLE_SELECT_GRAPH_NODE,
    id
  }
}

export const multiSelectGraphNode = (id) => {
  return {
    type: MULTI_SELECT_GRAPH_NODE,
    id
  }
}

export const clearSelectedGraphNodes = () => {
  return {
    type: CLEAR_SELECTED_GRAPH_NODES
  }
}

export const dragGraphNodes = (id, dx, dy) => {
  return {
    type: DRAG_GRAPH_NODES,
    id,
    dx,
    dy    
  }
}

export const stopDraggingGraphNodes = () => {
  return {
    type: STOP_DRAGGING_GRAPH_NODES
  }
}