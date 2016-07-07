import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import GraphNode from '../../components/GraphNode'
import GraphPoints from '../../components/GraphPoints'

function setup(props) {
  const component = shallow(
    <GraphNode {...props} />
  )
  
  return {
    component: component,
    graphPoints: component.find(GraphPoints)
  } 
}

describe('GraphNode component', () => {  
  it('should render GraphPoints component when selected', () => {
    const { component, graphPoints } = setup({selected: true})
    expect(graphPoints.length).toEqual(1)
  })
 
  it('should render no GraphPoints component when not selected', () => {
    const { component, graphPoints } = setup({selected: false})
    expect(graphPoints.length).toEqual(0)
  })    
})
