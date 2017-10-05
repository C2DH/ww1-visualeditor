import React from 'react'
import { Row } from 'reactstrap'
import classNames from 'classnames'
import './HeadingRow.css'

const HeadingRow = ({ title = '', children, className }) => (
  <Row className={classNames('HeadingRow__row', className)}>
    <h3 className="HeadingRow__title">{title}</h3>
    {children}
  </Row>
)

export default HeadingRow
