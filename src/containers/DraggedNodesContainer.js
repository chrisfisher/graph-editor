import React from 'react'
import { connect } from 'react-redux'
import DraggedNodes from '../components/DraggedNodes'
import { getDraggedNodes, getDragDistance } from '../reducers'

let DraggedNodesContainer = ({ draggedNodes = [], dx = 0, dy = 0 }) => {
  const props = { draggedNodes, dx, dy }
  return (
    <DraggedNodes { ...props } />
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

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggedNodesContainer)