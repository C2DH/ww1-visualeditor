import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import './OpenSidebar.css'
import { logout } from '../../state/actions'

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
    const { logout } = this.props
    return (
     <div className="OpenSidebar">
       <ul className="OpenSidebar__toplist">
         <li><Link to="/" onClick={this.props.closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Home</Button></Link></li>
         <li><Link to="/themes" onClick={this.props.closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Themes</Button></Link></li>
         <li><Link to="/" onClick={this.props.closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Static Pages</Button></Link></li>
         <li><Link to="/" onClick={this.props.closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Education</Button></Link></li>
       </ul>
       <ul className="OpenSidebar__bottomlist">
         <li><Link to="/" onClick={this.props.closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Help</Button></Link></li>
         <li><Link to="/" onClick={this.props.closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Report a bug</Button></Link></li>
         <li><Button onClick={logout} className="OpenSidebar__btn" outline color="primary">Logout</Button></li>
       </ul>
       <div className="OpenSidebar__Language__container">
         <h6>Language</h6>
         <div className="OpenSidebar__LanguageBtn_container">
           <Button className="OpenSidebar__LanguageBtn">EN</Button>
           <Button className="OpenSidebar__LanguageBtn">FR</Button>
           <Button className="OpenSidebar__LanguageBtn">DE</Button>
         </div>
       </div>
     </div>
    )
  }
}

export default connect(undefined, {
  logout,
})(OpenSidebar)
