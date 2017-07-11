import React from 'react'

const Spinner = ({ fullpage = false }) => {
  return fullpage ? (
    <div style={{
      height: '100%',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999999,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ zIndex: 9999999, color: 'white' }}>
        <i className="fa fa-cog fa-spin fa-3x fa-fw" />
      </div>
    </div>
  ) : (
    <div style={{ paddingTop: 50, textAlign: 'center' }}>
      <i className="fa fa-cog fa-spin fa-3x fa-fw" />
    </div>
  )
}

export default Spinner
