import React from 'react'
import { Input } from 'reactstrap'

// Maybe pass down props such style or other shit...
const Select = ({ input: { value, onChange }, children }) => (
  <Input type='select' value={value} onChange={onChange}>{children}</Input>
)

export default Select
