import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import GraphNode from './GraphNode'

const GraphScene = ({ graphNodes, onGraphNodeDragStart, onGraphNodeDragStop, onGraphNodeDrag, onGraphSceneClick }) => {
  const nodes = graphNodes.map(graphNode =>      
      <GraphNode
        key={graphNode.id}
        {...graphNode}          
        onDragStart={(event) => onGraphNodeDragStart(event, graphNode.id)}
        onDragStop={(event) => onGraphNodeDragStop(event, graphNode.id)}
        onDrag={(event, data) => onGraphNodeDrag(event, data, graphNode.id)} />
    )
    
    return (
      <svg className="graphScene" onClick={(event) => onGraphSceneClick(event)}>
        {nodes}
      </svg>
    )
}

export default GraphScene 