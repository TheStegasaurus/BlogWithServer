import React, { Component } from 'react'

/* Renders one blog summary element with the post name, date, and a truncated version of the post */
class BlogSummary extends Component{
  render () {
    let post = this.props.data
    console.log(post)
    return(
      <div className="leftcolumn">
        <div className="card">
          {/*eslint-disable-next-line*/}
          <h2><a onClick={()=>this.props.setPostID(post._id)}>{post.title}</a></h2>
          <h5>{post.date}</h5>
          <p>{post.content.substring(0, 625)}...</p>
        </div>
      </div>
    )
  }
}  

export default BlogSummary;