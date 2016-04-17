import React from 'react'

let connectorRadius = 5

const GraphConnector = ({cx, cy}) => {
  return (
     <circle className='graphConnectorPoint' cx={cx} cy={cy} r={connectorRadius}></circle>
  )
}

export default GraphConnector