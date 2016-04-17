import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { addGraphNode } from '../actions'

let offset = 10

let AddGraphNode = ({ dispatch }) => {
  return (
    <div>      
      <Button bsStyle="info" onClick={() => {
        dispatch(addGraphNode(offset,offset))
        offset += 5
      }}>
        Add graph node
      </Button>
    </div>
  )
}

AddGraphNode = connect()(AddGraphNode)

export default AddGraphNode