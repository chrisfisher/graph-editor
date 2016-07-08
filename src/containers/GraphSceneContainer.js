import React from 'react'
import { connect } from 'react-redux'
import GraphScene from '../components/GraphScene'
import { clearSelectedNodes } from '../actions'

let GraphSceneContainer = ({ onGraphSceneClick }) => {
  const props = { onGraphSceneClick }
  return (
    <GraphScene { ...props } />
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGraphSceneClick: (event) => {
      if (event.target.tagName == 'svg') {
        dispatch(clearSelectedNodes())
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphSceneContainer)