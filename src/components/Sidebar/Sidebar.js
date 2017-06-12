import React, { PureComponent } from 'react'
import { Button } from 'reactstrap'
import OpenSidebar from '../OpenSidebar'
import './Sidebar.css'

class Sidebar extends PureComponent {

  state = {
    open:false,
    lang: "EN"
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  setLang = lang => this.setState({ lang })

  render () {
    return (
      <div className="Sidebar__container">
        {this.state.open ? <OpenSidebar setLang={this.setLang} closeMenu={this.toggleMenu} key="opensidebar"/> : null}
        <Button className="Sidebar__menuBtn" onClick={this.toggleMenu} key="button">
          {this.state.open ? <i className="icon-close Sidebar__menuBtn__icon" /> : <i className="icon-dehaze Sidebar__menuBtn__icon" />}
        </Button>
        <Button className="Sidebar__menuBtn Sidebar__languageBtn">{this.state.lang}</Button>
      </div>
    )
  }
}

export default Sidebar
