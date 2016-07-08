import React from 'react'
import DraggableNodesContainer from '../containers/DraggableNodesContainer'
import DraggedNodesContainer from '../containers/DraggedNodesContainer'

const GraphScene = ({ onGraphSceneClick }) => {
  return (
    <svg className="graphScene" onClick={(event) => onGraphSceneClick(event)}>
      <DraggedNodesContainer />
      <DraggableNodesContainer />
    </svg>
  )
}

export default GraphScene