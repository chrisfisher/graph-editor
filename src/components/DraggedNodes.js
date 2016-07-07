import React from 'react'
import DraggedNode from './DraggedNode'

const DraggedNodes = ({ draggedNodes, dx, dy }) => {
  return (
    <g transform={'translate(' + dx + ',' + dy +')'}>
      {draggedNodes.map(x => (
        <DraggedNode key={x.nodeId} draggedNodeFrame={x.draggedNodeFrame} graphPoints={x.graphPoints} />
        )
      )}
    </g>
  )
}

export default DraggedNodes 