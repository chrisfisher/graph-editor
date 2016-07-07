import React from 'react'
import { DraggableCore } from 'react-draggable'

let radius = 5

const GraphPoint = ({cx, cy, onDragStart, onDrag, onDragStop}) => {
  return (
    <DraggableCore onStart={onDragStart} onDrag={onDrag} onStop={onDragStop}>
      <circle className="graphPoint" cx={cx} cy={cy} r={radius} ></circle>
    </DraggableCore>
  )
}

export default GraphPoint