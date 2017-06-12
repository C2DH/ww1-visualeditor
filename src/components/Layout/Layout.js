import React from 'react'
import './Layout.css'
import Sidebar from '../../components/Sidebar'

const Layout = ({ children }) => (
  <div className="Layout">
    <Sidebar />
    <div className="Layout__container">

    </div>
    {children}
  </div>
)

export default Layout
