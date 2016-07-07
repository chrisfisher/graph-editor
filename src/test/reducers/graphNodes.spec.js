import expect from 'expect'
import { default as graphNodes } from '../../reducers/graphNodes'

describe('graphNodes reducer', () => {
  it('should handle ADD_GRAPH_NODE action', () => {
    const action = {
      type: 'ADD_GRAPH_NODE',
      id: 1,
      x: 10,
      y: 10
    }
    
    expect(graphNodes(undefined, action)).toEqual([{
      id: 1,
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      dx: 0,
      dy: 0,
      selected: false,
      dragged: false        
    }])
  }) 
  
  it('should handle SINGLE_SELECT_GRAPH_NODE action', () => {
    const action = {
      type: 'SINGLE_SELECT_GRAPH_NODE',
      id: 1
    }
    
    const state = [{
      id: 1,        
      selected: false
    },{
      id: 2,        
      selected: true
    }]
    
    expect(graphNodes(state, action)).toEqual([{
      id: 1,        
      selected: true      
    },{
      id: 2,        
      selected: false      
    }])
  })     
  
  it('should handle MULTI_SELECT_GRAPH_NODE action', () => {
    const action = {
      type: 'MULTI_SELECT_GRAPH_NODE',
      id: 1
    }
    
    const state = [{
      id: 1,        
      selected: false
    },{
      id: 2,        
      selected: true
    }]
          
    expect(graphNodes(state, action)).toEqual([{
      id: 1,        
      selected: true      
    },{
      id: 2,        
      selected: true      
    }])
  })   
  
  it('should handle CLEAR_SELECTED_GRAPH_NODES action', () => {
    const action = {
      type: 'CLEAR_SELECTED_GRAPH_NODES'
    }
    
    const state = [{
      id: 1,        
      selected: true
    },{
      id: 2,        
      selected: true
    }]
          
    expect(graphNodes(state, action)).toEqual([{
      id: 1,        
      selected: false      
    },{
      id: 2,        
      selected: false      
    }])
  })  
  
  it('should handle DRAG_GRAPH_NODES action', () => {
    const action = {
      type: 'DRAG_GRAPH_NODES',
      id: 2,
      dx: 1,
      dy: 1  
    }
    
    const state = [{
      id: 1,        
      selected: false,
      dx: 0,
      dy: 0,
      dragged: false
    },{
      id: 2,        
      selected: true,
      dx: 0,
      dy: 0,
      dragged: false
    },{
      id: 3,        
      selected: true,
      dx: 0,
      dy: 0,
      dragged: false
    }]
          
    expect(graphNodes(state, action)).toEqual([{
      id: 1,        
      selected: false,
      dx: 0,
      dy: 0,
      dragged: false
    },{
      id: 2,        
      selected: true,
      dx: 1,
      dy: 1,
      dragged: false
    },{
      id: 3,        
      selected: true,
      dx: 1,
      dy: 1,
      dragged: true
    }])
  })            
  
  it('should handle STOP_DRAGGING_GRAPH_NODES action', () => {
    const action = {
      type: 'STOP_DRAGGING_GRAPH_NODES'
    }
    
    const state = [{
      id: 1,        
      selected: false,
      dragged: false,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0
    },{
      id: 2,        
      selected: true,
      dragged: true,
      x: 10,
      y: 10,
      dx: 5,
      dy: 5
    }]
          
    expect(graphNodes(state, action)).toEqual([{
      id: 1,        
      selected: false,
      dragged: false,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0      
    },{
      id: 2,        
      selected: true,
      dragged: false,
      x: 15,
      y: 15,
      dx: 0,
      dy: 0         
    }])
  })
})

