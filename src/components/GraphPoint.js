import React from 'react'
import { DraggableCore } from 'react-draggable'

const width = 8
const height = 8

const GraphPoint = ({cx, cy, onDragStart, onDrag, onDragStop}) => {
  return (
    <DraggableCore onStart={onDragStart} onDrag={onDrag} onStop={onDragStop}>
      <rect className="graphPoint" x={cx - width/2} y={cy - height/2} style={{ width: width, height: height }}></rect>
    </DraggableCore>
  )
}

export default GraphPoint