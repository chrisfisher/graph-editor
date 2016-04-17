import graphNode from './graphNode'
import { 
  ADD_GRAPH_NODE,
  SINGLE_SELECT_GRAPH_NODE,
  MULTI_SELECT_GRAPH_NODE,
  CLEAR_SELECTED_GRAPH_NODES,
  STOP_DRAGGING_GRAPH_NODES,
  DRAG_GRAPH_NODES
} from '../constants/ActionTypes'


const graphNodes = (state = [], action) => {
  switch (action.type) {
    case ADD_GRAPH_NODE:
      return [
        ...state,
        graphNode(undefined, action)
      ]    
    case SINGLE_SELECT_GRAPH_NODE:
      return state.map(x =>
        graphNode(x, action)
      )
    case MULTI_SELECT_GRAPH_NODE:
      return state.map(x =>
        graphNode(x, action)
      )
    case CLEAR_SELECTED_GRAPH_NODES:
      return state.map(x =>
        graphNode(x, action)
      )
    case DRAG_GRAPH_NODES:
      return state.map(x =>
        graphNode(x, action)
      )
    case STOP_DRAGGING_GRAPH_NODES:
      return state.map(x =>
        graphNode(x, action)
      )
    default:
      return state
  }
}

export default graphNodes