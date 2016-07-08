import React from 'react'
import GraphPoints from './GraphPoints'

const DraggedNode = ({ draggedNodeFrame, graphPoints }) => { 
  const { x, y, width, height } = draggedNodeFrame 
  return (
    <g>
      <rect className="graphNode" x={x} y={y} style={{ width: width, height: height }}></rect>
      <GraphPoints graphPoints={graphPoints} />
    </g>
  )
}

export default DraggedNode