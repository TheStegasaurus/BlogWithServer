import React, { Component } from 'react'
import SignIn from './SignIn'

/**
 * Renders the three components in the sidebar: sign in panel, about panel, and posts panel
 **/
class SidePanel extends Component{
  render () {
    let posts = this.props.data
    return(
      <div>
        <div className="rightcolumn">
          <div className="card">
            {
              //Since user is anon by default, displays sign in page if user has not been specified
              this.props.user == "anon"
              ? <SignIn setUser={this.props.setUser}/>
              : <div>
                  <h2>Welcome, {this.props.user}</h2>
                  <button onClick={()=>this.props.clearUser()}>Log out</button>
                </div>  
            }
          </div>
          
          <div className="card">
            <h2>About Blog</h2>
            <p>A blog is a discussion or informational website published
               on the World Wide Web consisting of discrete, often
               informal diary-style text entries. Posts are typically
               displayed in reverse chronological order, so that the
               most recent post appears first, at the top of the web page.</p>
          </div>

          <div className="card">
            <h3>Posts</h3>
            <div>{
              //Renders every element containing a post title separated by a line
              posts.map((item)=>{
                return <div className="popularPost">
                        <hr/>
                        <a onClick={()=>this.props.setPostID(item._id)}>{item.title}</a>
                      </div>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

  export default SidePanel;