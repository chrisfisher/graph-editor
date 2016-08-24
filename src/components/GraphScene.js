import React from 'react'
import { connect } from 'react-redux'
import DraggableNodes from './DraggableNodes'
import DraggedNodes from './DraggedNodes'

import { clearSelectedNodes } from '../actions'

const GraphScene = ({ onGraphSceneClick }) => {
  return (
    <svg className="graphScene" onClick={(event) => onGraphSceneClick(event)}>
      <DraggedNodes />
      <DraggableNodes />
    </svg>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGraphSceneClick: (event) => {
      if (event.target.tagName == 'svg') {
        dispatch(clearSelectedNodes())
      }
    }
  }
}

export default connect(
  (state) => ({}),
  mapDispatchToProps
)(GraphScene)