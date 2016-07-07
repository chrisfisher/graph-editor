import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { addNode, deleteNodes, bringNodesToFront, sendNodesToBack } from '../actions'

let width = 100
let height = 100

let GraphControls = ({ dispatch }) => {
  return (
    <div>      
      <Button onClick={() => {dispatch(addNode(width, height))}}>Add</Button>
      <Button onClick={() => {dispatch(deleteNodes())}}>Delete</Button>
      <Button onClick={() => {dispatch(bringNodesToFront())}}>Bring to front</Button>
      <Button onClick={() => {dispatch(sendNodesToBack())}}>Send to back</Button>
    </div>
  )
}

GraphControls = connect()(GraphControls)

export default GraphControls