import React from 'react'
import { DraggableCore } from 'react-draggable'

const width = 8
const height = 8

let cursorMap = {
  1: 'northWest',
  2: 'west',
  3: 'southWest',
  4: 'north',
  5: 'south',
  6: 'northEast',
  7: 'east',
  8: 'southEast'
}

const GraphPoint = ({pointId, cx, cy, onDragStart, onDrag, onDragStop}) => {
  let className = 'graphPoint ' + cursorMap[pointId]

  return (
    <DraggableCore onStart={onDragStart} onDrag={onDrag} onStop={onDragStop}>
      <rect className={className} x={cx - width/2} y={cy - height/2} style={{ width: width, height: height }}></rect>
    </DraggableCore>
  )
}

export default GraphPoint