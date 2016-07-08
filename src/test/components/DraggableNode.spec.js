import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import DraggableNode from '../../components/DraggableNode'
import GraphPoints from '../../components/GraphPoints'

function setup(props) {
  const component = shallow(<DraggableNode {...props} />)
  
  return {
    component: component,
    graphPoints: component.find(GraphPoints)
  }
}

describe('DraggableNode component', () => {
  it('should render GraphPoints component when selected', () => {
    const { component, graphPoints } = setup({draggableNodeFrame: { x: 0, y: 0, width: 100, height: 100 }, selected: true})
    expect(graphPoints.length).toEqual(1)
  })

  it('should not render GraphPoints component when not selected', () => {
    const { component, graphPoints } = setup({draggableNodeFrame: { x: 0, y: 0, width: 100, height: 100 }, selected: false})
    expect(graphPoints.length).toEqual(0)
  })
})
