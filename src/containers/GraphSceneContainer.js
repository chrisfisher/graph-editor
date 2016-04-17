import React, { Component } from 'react'
import { connect } from 'react-redux'
import GraphScene from '../components/GraphScene'
import { 
  singleSelectGraphNode,
  multiSelectGraphNode,
  clearSelectedGraphNodes,
  stopDraggingGraphNodes,
  dragGraphNodes
} from '../actions'

let GraphSceneContainer = ({ graphNodes, onGraphNodeDragStart, onGraphNodeDragStop, onGraphNodeDrag, onGraphSceneClick }) => {
  const props = { graphNodes, onGraphNodeDragStart, onGraphNodeDragStop, onGraphNodeDrag, onGraphSceneClick }
  return (
    <GraphScene { ...props } />
  )
}

const mapStateToProps = (state) => {
  return {
    graphNodes: state.graphNodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGraphNodeDragStart: (event, id) => {
      if (event.shiftKey) {
        dispatch(multiSelectGraphNode(id))
      } else {
        dispatch(singleSelectGraphNode(id))
      }      
    },
    onGraphNodeDragStop: (event, id) => {
      dispatch(stopDraggingGraphNodes())
    },
    onGraphSceneClick: (event) => {
      if (event.target.tagName == 'svg') {
        dispatch(clearSelectedGraphNodes())
      }      
    },
    onGraphNodeDrag: (event, data, id) => {
      dispatch(dragGraphNodes(id, data.deltaX, data.deltaY))  
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphSceneContainer)