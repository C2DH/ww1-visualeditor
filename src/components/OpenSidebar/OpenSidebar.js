import React, { PureComponent } from 'react'
import './OpenSidebar.css'
import { Link } from 'react-router-dom'


class OpenSidebar extends PureComponent {

  state = {
    open:false
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
     <div className="OpenSidebar">
       <ul className="OpenSidebar__list">
         <li></li>
       </ul>
     </div>
    )
  }
}

export default OpenSidebar
