import React from 'react'
import { Row } from 'reactstrap'
import './HeadingRow.css'

const HeadingRow = ({title="", children}) => (
  <Row className="HeadingRow__row">
    <h3 className="HeadingRow__title">{title}</h3>
    {children}
  </Row>
)

export default HeadingRow
