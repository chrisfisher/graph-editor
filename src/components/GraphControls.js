// @flow

import React from 'react';
import { connect } from 'react-redux';

import {
  addNode,
  deleteNodes,
  bringNodesToFront,
  sendNodesToBack,
  addManyNodes,
  selectAllNodes,
} from '../actions';

const DEFAULT_NODE_WIDTH = 100;
const DEFAULT_NODE_HEIGHT = 100;

const GraphControls = props => (
  <div>
    <span className="button" onClick={() => { props.addNode(DEFAULT_NODE_WIDTH, DEFAULT_NODE_HEIGHT); }}>Add</span>
    <span className="button" onClick={() => { props.addManyNodes(DEFAULT_NODE_WIDTH, DEFAULT_NODE_HEIGHT); }}>Add many</span>
    <span className="button" onClick={() => { props.selectAllNodes(); }}>Select all</span>
    <span className="button" onClick={() => { props.deleteNodes(); }}>Delete</span>
    <span className="button" onClick={() => { props.bringNodesToFront(); }}>Bring to front</span>
    <span className="button" onClick={() => { props.sendNodesToBack(); }}>Send to back</span>
  </div>
);

export default connect(
  null,
  {
    addNode,
    deleteNodes,
    bringNodesToFront,
    sendNodesToBack,
    addManyNodes,
    selectAllNodes,
  }
)(GraphControls);
