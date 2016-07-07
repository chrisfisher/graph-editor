import React from 'react'
import DraggableNode from './DraggableNode'

const DraggableNodes = ({ draggableNodes, selectedIds, dx, dy, onNodeDragStart, onNodeDragStop, onNodeDrag, onPointDragStart, onPointDrag, onPointDragStop }) => {  
  return (
    <g>
      {draggableNodes.map(x => (
        <DraggableNode
          key={x.nodeId}
          nodeId={x.nodeId}
          selected={selectedIds.indexOf(x.nodeId) >= 0}
          draggableNodeFrame={x.draggableNodeFrame}  
          graphPoints={x.graphPoints}
          dx={dx}
          dy={dy}
          onNodeDragStart={(event) => onNodeDragStart(event, x.nodeId)}          
          onNodeDrag={(event, data) => onNodeDrag(event, data, x.nodeId)}
          onNodeDragStop={(event) => onNodeDragStop(event, x.nodeId)}
          onPointDragStart={onPointDragStart}
          onPointDrag={onPointDrag}
          onPointDragStop={onPointDragStop} />
        )
      )}
    </g>
  )
}

export default DraggableNodes 