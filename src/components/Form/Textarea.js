import React from 'react'
import { Input } from 'reactstrap'

// TODO: Handle meta props in an irrealistic future...
const Textarea = ({ input: { value, onChange }, meta, ...passProps }) => (
  <Input type='textarea' value={value} onChange={onChange} {...passProps} />
)

export default Textarea
