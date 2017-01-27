// @flow

import React from 'react';
import { connect } from 'react-redux';
import DraggableNodes from './DraggableNodes';
import DraggedNodes from './DraggedNodes';
import { clearSelectedNodes } from '../actions';

const GraphScene = (props: { onGraphSceneClick: (event: any) => void }) => (
  <svg className="graphScene" onClick={event => props.onGraphSceneClick(event)}>
    <DraggedNodes />
    <DraggableNodes />
  </svg>
);

const mapDispatchToProps = dispatch => ({
  onGraphSceneClick: (event) => {
    if (event.target.tagName == 'svg') {
      dispatch(clearSelectedNodes());
    }
  },
});

export default connect(
  null,
  mapDispatchToProps
)(GraphScene);
