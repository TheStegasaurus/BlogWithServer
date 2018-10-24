import React, { Component } from 'react'

/* Header component containing title and Home button */
class Header extends Component{
    render () {
      return(
      <div>
        <div className="header">BLOG APP</div>
        
        <hr/>
        {/*eslint-disable-next-line*/}
        <div className='headeritem'><a onClick={()=>this.props.goHome()}>HOME</a></div>
        <hr/>
      </div>
      )
    }
}
export default Header;