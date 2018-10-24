import React, { Component } from 'react'

class SignIn extends Component{
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  //Sets parent state variable user to whatever is in the box
  handleSubmit(event) {
    this.props.setUser(this.state.title)
    event.preventDefault()
  }

  //Changes state variable username as user types name into box
  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  
  render () {
    return (
      <div className="newPost">
        <div className="newPostHeader">SIGN IN</div>
        <hr/>
        <form onSubmit={this.handleSubmit}>
        <br/>
          <label>Username:</label>
          <br/>
          <input type="text" name="title" onChange={this.handleChange} />
          <br/><br/>
          <input type="submit" value="Sign In" />
        </form>
      </div>
    )
  }
}
  
export default SignIn;