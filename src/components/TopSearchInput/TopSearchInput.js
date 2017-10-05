import React from 'react'
import { Input } from 'reactstrap';
import './TopSearchInput.css'

const TopSearchInput = (props) => (
  <div className="TopSearchInput__container">
      <Input placeholder="Search" {...props} />
  </div>
)

export default TopSearchInput
