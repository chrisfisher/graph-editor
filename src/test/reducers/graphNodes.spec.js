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
})

