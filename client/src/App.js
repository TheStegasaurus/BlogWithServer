import React, { Component } from 'react';
import './App.css';


//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
//http://blog-application3.herokuapp.com/

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
      .then(res => {
        console.log(res);
        return this.setState({ 
          serverData: res.express
        })
      })
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
    // Set state to loading
    const response = await fetch('/api/getData');
    // set state to no more loading :-)
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
          posts && posts.length > 0 &&
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
              !currPost&&
              <NewPost />
            }

            {
              currPost &&
              <BlogPost data={posts.find(e => e._id === currPost)} sendComment={this.sendComment}/>
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
      <div className="header">BLOG APP</div>

      <button>Sign In</button>
      <button>Sign Up</button>
      
      <hr style={linestyle}/>
      {/*eslint-disable-next-line*/}
      <div className='headeritem'><a onClick={()=>this.props.goHome()}>HOME</a></div>
      <div className='headeritem'>AUTHORS</div>
      <div className='headeritem'>CONTACT</div>

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
                //eslint-disable-next-line
                return <div><a onClick={()=>this.props.setPostID(item._id)}>{item.title}</a></div>
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

class BlogPost extends Component{

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let post = this.props.data;

    fetch('/api/submitComment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: post._id,
        c_id: post.comments.length+1,
        user: "John doe",
        content: this.state.value,
      })
    })

    event.preventDefault();
  }

  render () {
    let post = this.props.data;
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
              <label>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          }
        </div>
      </div>
    )
  }
}


class NewPost extends Component{
  constructor(props) {
    super(props);
    this.state = {title: '', content:''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log("submitted")
    fetch('/api/submitPost', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        author: "NEW AUTHOR",
        content: this.state.content
      })
    })

    event.preventDefault();
  }

  render () {
    return(
      
      <div className="leftcolumn">
        <div className="card">
          <div className="newPostHeader">SUBMIT A POST</div>
          <hr style={linestyle}/>
          <form onSubmit={this.handleSubmit}>
            <div className="newPost">
              <br/>
              Title:
              <br/>
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
              <br/><br/>
              Content:
              <br/> 
              <textarea name="content" rows="4" cols="50" value={this.state.content} onChange={this.handleChange}></textarea>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }

}
