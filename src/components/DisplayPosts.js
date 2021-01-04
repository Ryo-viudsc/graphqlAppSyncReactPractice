import React, {Component} from "react";


//you can see each function from the 
//auto generated files "queries.js"
import { listPosts } from "../graphql/queries";
import { onCreatePost, onUpdatePost } from "../graphql/subscriptions";

//for subscription 
import {onDeletePost} from "../graphql/subscriptions";

import { API, graphqlOperation } from 'aws-amplify';
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import CreateCommentPost from "./CreateCommentPost.js";


//API allows us to fetch the actual API that we've created 
//each class has to have the render method 
//to generate the JSX elements
//when the class invoked  
class DisplayPosts extends Component {

  state = {
      posts: []
  }


  //componentDidMount is called immedialtely after 
  //the comopnent is mounted (meaning when it's visible)
  //cuz we want them to happen in the desired order 
  componentDidMount = async () => {
      this.getPosts();

      //post Listener 
      //we have to unmount the listner later 
      this.createPostListener = API.graphql(graphqlOperation(onCreatePost))
          .subscribe({
              next : postData => {
                //console.log({provider, value});
                const newPost = postData.value.data.onCreatePost;
                const prevPosts = this.state.posts.filter(post => post.id !== newPost.id)
                //just to get all the previous posts here 

                //spread operator
                const updatedPosts = [newPost, ...prevPosts];
                this.setState({ posts: updatedPosts});

              } //we have the correct post in the right position
          })


      //lisner always should be on the display components
      this.deletePostListener = API.graphql(graphqlOperation(onDeletePost))    
          .subscribe({
            next: postData => {
                
              const deletedPost = postData.value.data.onDeletePost;
              const updatedPosts = this.state.posts.filter(post => post.id !== deletedPost.id);

              this.setState({posts:updatedPosts});

            }
          })

       this.updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
            .subscribe({
              next: postData => {
                const {posts} = this.state; 
                const updatePost = postData.value.data.onUpdatePost;

                //create var index 
                //the post that i have in array is unique 
                //so that I can re-organize the array 
                const index = posts.findIndex(post => post.id === updatePost.id);
                const updatePosts = [
                  ...posts.slice(0,index),
                  updatePost,
                  ...posts.slice(index+1)
                ]; 
                this.setState({posts : updatePosts});
              }
            })
  }
  

  componentWillUnmount(){
    this.createPostListener.unsubscribe();
    this.deletePostListener.unsubscribe();
    this.updatePostListener.unsubscribe();
  }


  getPosts = async () => {
    //we need to put graphql operation inside of the brackets 
        const result = await API.graphql(graphqlOperation(listPosts))
        console.log("All posts: ", JSON.stringify(result.data.listPosts.items))
        this.setState({posts: result.data.listPosts.items});
  }


  render () {
    
    //state distraction 
    const {posts} = this.state;


    //mapping post here 
    return (
      posts.map((post) => {
        return (
          <div className="posts" style={rowStyle}  key= {post.id}>
              <h1>{post.postTitle}</h1>
              <span style={{fontStyle:"italic", color:"#0ca5e297"}}>
                {"wrote by : "} {post.postOwnerUsername}
                <time style={{fontStyle:"italic"}}> 
                {" "}
                { new Date(post.createdAt).toDateString()}
              </time>
              </span>
              <p>{ post.postBody }</p>
              <br />
              <span>
                  <DeletePost data={post}/>
                  <EditPost {...post} />
              </span>
              <span>
                    <CreateCommentPost  postId={post.id} /> 
              </span>
          </div>
        )
      })
    )
  }

}

const rowStyle = {
  background: '#f4f4f4',
  padding: '10px',
  border: '1px #ccc dotted',
  margin: '14px'
}


export default DisplayPosts;



