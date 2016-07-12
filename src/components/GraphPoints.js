import React from 'react'
import GraphPoint from './GraphPoint'

const GraphPoints = ({ graphPoints, nodeId, onPointDragStart, onPointDrag, onPointDragStop }) => {
  return (
    <g>
      {graphPoints.map(x => (
        <GraphPoint 
          key={nodeId + '-' + x.pointId}
          pointId={x.pointId} 
          cx={x.cx}
          cy={x.cy}
          onDragStart={(event) => onPointDragStart(event, x.pointId, nodeId )}
          onDrag={(event, data) => onPointDrag(event, data, x.pointId, nodeId )}
          onDragStop={(event) => onPointDragStop(event, x.pointId, nodeId )} />
        )
      )}
    </g>
  )
}

export default GraphPoints