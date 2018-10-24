import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import SidePanel from './components/SidePanel'
import BlogSummary from './components/BlogSummary'
import BlogPost from './components/BlogPost'
import NewPost from './components/NewPost'


//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
//http://blog-application34.herokuapp.com/

/*******************************************************
 * Main flow of front end. Immediately retrieves server
 * data on load, and controls the setting of the current
 * post and user, both in immediate memory and local 
 * storage for persistence across page reload.
 *******************************************************/
class App extends Component {
  constructor(){
    super()

    this.state = {
      serverData: {}, 
      postid: null || localStorage.getItem('postid'), 
      user: localStorage.getItem('user') || "anon"
    }

    //Makes a copy of local function for context switches of 'this' across components
    this.setPostID = this.setPostID.bind(this)
    this.goHome = this.goHome.bind(this)
    this.setUser = this.setUser.bind(this)
    this.clearUser = this.clearUser.bind(this)
  }

  //Called immediately after load. Creates a promise that returns
  //the server data and sets the data to the retrieved data from the database
  componentDidMount() {
    this.callApi()
      .then(res => {
        console.log(res)
        return this.setState({ 
          serverData: res.express
        })
      })
      .catch(err => console.log(err))
  }


  setUser(user){ 
    localStorage.setItem('user', user)
    this.setState({ user: user })
  }
  
  clearUser(){ 
    localStorage.setItem('user', 'anon')
    this.setState({ user: 'anon' })
  }

  setPostID(id) {
    localStorage.setItem('postid', id)
    this.setState({ postid: id })
  }

  goHome() {
    localStorage.removeItem('postid');
    this.setState({ postid: null })
  }

  //Call the getData endpoint with a get request to retrieve server data
  callApi = async () => {
    const response = await fetch('/api/getData') //pause execution until data returns
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    return body
  }

  render() {
    let posts = this.state.serverData.posts
    let currPost = this.state.postid
    return (
      <div className="App" >
        { 
          //Only render if there are posts
          posts &&
          <div>
            <Header goHome={this.goHome}/>
            <SidePanel 
              data={posts} 
              setPostID={this.setPostID}
              setUser={this.setUser}
              user={this.state.user}
              clearUser={this.clearUser}/> 
            {
              //render the summary page if no specific post is identified, otherwise show post and comment section
              currPost
              ? <BlogPost 
                  data={posts.find(e => e._id === currPost)}
                  sendComment={this.sendComment}
                  user={this.state.user}/>
              : [posts.map((post)=>{
                  return <BlogSummary data={post} setPostID={this.setPostID}/>
                },this),<NewPost user={this.state.user}/>]
            }
          </div>
        }
      </div>
    )
  }
}

export default App