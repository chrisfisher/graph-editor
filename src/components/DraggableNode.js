import React from 'react'
import { DraggableCore } from 'react-draggable'
import GraphPoints from './GraphPoints' 

const DraggableNode = ({ nodeId, selected, draggableNodeFrame, graphPoints, dx, dy, onNodeDragStart, onNodeDrag, onNodeDragStop, onPointDragStart, onPointDrag, onPointDragStop }) => {  
  const { x, y, width, height } = draggableNodeFrame 
  
  if (selected) {
    return (
      <DraggableCore onStart={onNodeDragStart} onDrag={onNodeDrag} onStop={onNodeDragStop}>
        <g transform={'translate(' + dx + ',' + dy +')'}>
          <rect className="graphNode" x={x} y={y} style={{ width: width, height: height }}></rect>
          <GraphPoints 
            graphPoints={graphPoints}
            nodeId={nodeId}
            onPointDragStart={onPointDragStart}
            onPointDrag={onPointDrag}
            onPointDragStop={onPointDragStop} />
        </g>
      </DraggableCore>
    )
  }
  
  return (
    <DraggableCore onStart={onNodeDragStart} onDrag={onNodeDrag} onStop={onNodeDragStop}>
      <rect className="graphNode" x={x} y={y} style={{ width: width, height: height }} ></rect>
    </DraggableCore>
  )
}

export default DraggableNode