import React, { Component } from 'react'

/* Structure of the Component that allows us to input text and 
 * send new post data to the server */
class NewPost extends Component{
  
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  //Sends post request to server with the data needed to create a new post in the database
  handleSubmit(event) {
    fetch('/api/submitPost', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        author: this.props.user,
        content: this.state.content
      })
    })

    setTimeout(() => {
      window.location.reload()
    }, 500)
  
    event.preventDefault()
  }

  /* Sets state variables every time the values in the text boxes change */
  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render () {
    return (
      <div className="leftcolumn">
        <div className="card">
          <div className="newPost">
            <div className="newPostHeader">SUBMIT A POST</div>
            <hr/>
            
            <form onSubmit={this.handleSubmit}>
            <br/>
              <label>Title:</label>
              <br/>
              <input type="text" name="title" onChange={this.handleChange} />
              <br/><br/>
              <label>Content:</label>
              <br/>
              <textarea type="text" name="content" rows="4" cols="50" onChange={this.handleChange} />
              <br/><br/>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default NewPost;