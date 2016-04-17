import React from 'react'
import Draggable from 'react-draggable'
import GraphConnector from './GraphConnector'

let width = 100
let height = 100 

const GraphNode = ({ x, y, dx, dy, onDragStart, onDragStop, onDrag, selected, dragged }) => {
  if (dragged) {
    return (
      <g transform={'translate(' + dx + ',' + dy +')'}>              
        <rect className='graphNode' x={x} y={y} width={width} height={height}></rect>      
        <GraphConnector cx={x} cy={y}/>
        <GraphConnector cx={x} cy={y + height}/>
        <GraphConnector cx={x + width} cy={y}/>
        <GraphConnector cx={x + width} cy={y + height}/>
      </g>
    )
  }  
  
  if (selected) {
    return (
      <Draggable onDrag={onDrag} onStop={onDragStop}>
        <g>              
          <rect className='graphNode' x={x} y={y} width={width} height={height} ></rect>        
          <GraphConnector cx={x} cy={y}/>
          <GraphConnector cx={x} cy={y + height}/>
          <GraphConnector cx={x + width} cy={y}/>
          <GraphConnector cx={x + width} cy={y + height}/>
        </g>
      </Draggable>
    )
  }
  
  return (
    <Draggable onDrag={onDrag} onStart={onDragStart}>
      <rect className='graphNode' x={x} y={y} width={width} height={height}></rect>
    </Draggable>
  )    
}

export default GraphNode