import React from 'react'
// import { omit } from 'lodash'
import { Input } from 'reactstrap'

// Maybe pass down props such style or other shit...
const FormInput = ({ input: { value, onChange }, meta, ...passProps }) => (
  <Input value={value} onChange={onChange} {...passProps} />
)

export default FormInput
