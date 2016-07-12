import expect from 'expect'
import { default as graphNodes } from '../../reducers/graphNodes'

describe('graphNodes reducer', () => {
  it('should handle ADD_NODE action', () => {
    const action = {
      type: 'ADD_NODE',
      nodeId: 1,
      x: 10,
      y: 10,
      width: 100,
      height: 100
    }
    
    expect(graphNodes(undefined, action)).toEqual({
      byId: {
        1: {
          x: 10,
          y: 10,
          width: 100,
          height: 100
        }
      },
      orderedIds: [1],
      selectedId: 0,
      selectedIds: [],
      draggedIds: [],
      dragDistance: { x: 0, y: 0 }
    })
  })

  it('should handle DELETE_NODES action', () => {
    const action = {
      type: 'DELETE_NODES',
      selectedIds: [1]
    }

    const state = {
      byId: {
        1: {
          x: 10,
          y: 10,
          width: 100,
          height: 100
        }
      },
      orderedIds: [1],
      selectedId: 1,
      selectedIds: [1],
      draggedIds: [],
      dragDistance: { x: 0, y: 0 }
    }

    expect(graphNodes(state, action)).toEqual({
      byId: {},
      orderedIds: [],
      selectedId: 0,
      selectedIds: [],
      draggedIds: [],
      dragDistance: { x: 0, y: 0 }
    })
  })
})

