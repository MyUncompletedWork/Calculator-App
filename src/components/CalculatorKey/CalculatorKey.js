import React from 'react';
import './CalculatorKey.css'

const key = (props) => (
  <div onClick={props.clicked} className='keys'>{props.calKey}</div>
)

export default key
