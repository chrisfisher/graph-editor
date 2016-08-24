import React from 'react'
import { connect } from 'react-redux'
import DraggedNode from './DraggedNode'
import { getDraggedNodes, getDragDistance } from '../reducers'

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

const mapStateToProps = (state) => {
  let {x, y} = getDragDistance(state)
  return {
    draggedNodes: getDraggedNodes(state),
    dx: x,
    dy: y
  }
}

export default connect(
  mapStateToProps
)(DraggedNodes)