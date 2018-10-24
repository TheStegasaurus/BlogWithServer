import React, { Component } from 'react'


/* Main Component that renders a full blog post and comment section */
class BlogPost extends Component{

  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //Handles change in text in comment box
  handleChange(event) {
    this.setState({value: event.target.value})
  }

  //Sends post request for submitting a commment, along with post id of parent
  handleSubmit(event) {
    let post = this.props.data

    fetch('/api/submitComment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: post._id,
        c_id: post.comments.length+1,
        user: this.props.user,
        content: this.state.value,
      })
    }).then(
      window.location.reload()
    )
    

    event.preventDefault()
  }

  render () {
    let post = this.props.data
    console.log()
    return(
      <div className="leftcolumn">
        <div className="card">
          <h2>{post.title}</h2>
          by {post.author}
          <h5>{post.date}</h5>
          <p>{post.content}</p>
          <div className="commentHeader">COMMENTS</div>
          <div className="commentSection">{post.comments.map((item)=>{
            return <div className="comment">{item.c_timestamp} - {item.c_author} : {item.c_content}</div>
          })}
          </div>
          <div className="commentHeader">Submit a Comment:</div>
          {
            <form onSubmit={this.handleSubmit}>
              <label className="commentBox">
                <input type="text"  value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          }
        </div>
      </div>
    )
  }
}
  
export default BlogPost;