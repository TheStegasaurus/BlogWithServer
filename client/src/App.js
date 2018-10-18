import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let linestyle = {
  background: 'black',
  height: '4px',
}

class App extends Component {
  constructor(){
    super()
    this.state = {serverData: {}, postid:null}
    this.setPostID = this.setPostID.bind(this);
    this.goHome = this.goHome.bind(this); 
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ serverData: res.express }))
      .catch(err => console.log(err));
  }

  setPostID(id) {
    this.setState({
        postid: id
    });
  }

  goHome() {
    this.setState({
        postid: null
    });
  }

  callApi = async () => {
    const response = await fetch('/api/getData');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    let posts = this.state.serverData.posts
    let currPost = this.state.postid;
    return (
      <div className="App" >
        { 
          posts &&
          <div>
            <Header goHome={this.goHome}/>
            <SidePanel data={posts} setPostID={this.setPostID}/>
            {
              //render the summary page if no specific post is identified
              !currPost && 
              posts.map((post)=>{
                return <BlogSummary data={post} setPostID={this.setPostID}/>
              },this)
            }  
            
            {
              currPost &&
              <BlogPost data={posts.find(e => e.id === currPost)}/>
            }
          </div>
        }
      </div>
    );
  }
}

export default App;

class Header extends Component{
  render () {
    return(
    <div>
      <div className="header">BLOG APPLICATION</div>

      <button>Sign In</button>
      <button>Sign Up</button>
      
      <hr style={linestyle}/>

      <div className='headeritem'><a onClick={()=>this.props.goHome()}>HOME</a></div>
      <div className='headeritem'><a href="#">AUTHORS</a></div>
      <div className='headeritem'><a href="#">CONTACT</a></div>

      <hr style={linestyle}/>

    </div>
    )
  }
}

class SidePanel extends Component{
  render () {
    let posts = this.props.data;
    return(
      <div>
        <div className="rightcolumn">
          <div className="card">
            <h2>About Blog</h2>
            <p>A blog is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries. Posts are typically displayed in reverse chronological order, so that the most recent post appears first, at the top of the web page.</p>
          </div>
          <div className="card">
            <h3>Popular Posts</h3>
            <div className="popularPosts">{posts.map((item)=>{
                return <div><a onClick={()=>this.props.setPostID(item.id)}>{item.title}</a></div>
             })}
            </div>
          </div>
          <div className="card">
            <h3>Follow Me</h3>
            <p>Insert Social media here</p>
          </div>
        </div>
      </div>
    )
  }
}

class BlogSummary extends Component{
  render () {
    let post = this.props.data;
    return(
      <div className="leftcolumn">
        <div className="card">
          <h2><a onClick={()=>this.props.setPostID(post.id)}>{post.title}</a></h2>
          <h5>{post.date}</h5>
          <p>{post.content.substring(0, 625)}...</p>
        </div>
      </div>
    )
  }
}

class BlogPost extends Component{
  render () {
    let post = this.props.data;
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
          <form className="submitComment">
            <input type="text"></input>
          <input type="submit" value="Submit"/>
          </form>
        </div>

      </div>
    )
  }
}