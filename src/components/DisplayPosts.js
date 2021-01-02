import React, {Component} from "react";


//you can see each function from the 
//auto generated files "queries.js"
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";


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
  }
  
//   (alias) graphqlOperation(query: any, variables?: {}): {
//     query: any;
//     variables: {};
// }

  getPosts = async () => {
    //we need to put graphql operation inside of the brackets 
        const result = await API.graphql(graphqlOperation(listPosts))
        console.log("All posts: ", JSON.stringify(result.data.listPosts.items))
        

        this.setState({posts: result.data.listPosts.items});
      }


  render () {
    
    //state distraction 
    const {posts} = this.state;



    return (
      posts.map((post)=>{
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
              <p>{post.postBody}</p>
              <br />
              <span>
                  <DeletePost />
                  <EditPost />
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



