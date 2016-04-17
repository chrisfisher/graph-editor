import { 
  ADD_GRAPH_NODE,
  SINGLE_SELECT_GRAPH_NODE,
  MULTI_SELECT_GRAPH_NODE,
  CLEAR_SELECTED_GRAPH_NODES,
  STOP_DRAGGING_GRAPH_NODES,
  DRAG_GRAPH_NODES
} from '../constants/ActionTypes'

const graphNode = (state, action) => {
    switch (action.type) {
    case ADD_GRAPH_NODE:
      return {
        id: action.id,
        x: action.x,
        y: action.y,
        dx: 0,
        dy: 0,
        selected: false,
        dragged: false
      }   
    case SINGLE_SELECT_GRAPH_NODE:
      return state.id === action.id 
        ? {...state, selected: true }
        : {...state, selected: false }   
    case MULTI_SELECT_GRAPH_NODE:
      return state.id === action.id 
        ? {...state, selected: true }
        : state
    case CLEAR_SELECTED_GRAPH_NODES:
      return {...state, selected: false }
    case DRAG_GRAPH_NODES:
      if (!state.selected) { return state; }
      return state.id === action.id 
        ? {...state, dx: state.dx + action.dx, dy: state.dy + action.dy, dragged: false }
        : {...state, dx: state.dx + action.dx, dy: state.dy + action.dy, dragged: true }       
    case STOP_DRAGGING_GRAPH_NODES:
      return state.dragged
        ? {...state, dragged: false, x: state.x + state.dx, y: state.y + state.dy, dx: 0, dy: 0 }
        : {...state, dragged: false }
    default:
      return state
  }
}

export default graphNode