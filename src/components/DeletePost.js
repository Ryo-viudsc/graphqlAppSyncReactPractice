import React, {Component} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deletePost } from "../graphql/mutations";




class DeletePost extends Component {



      componentDidMount = async () => {



      }


     handleDeletePost = async postId => {
        const input = { 
          id : postId
        }

        //delete the actual post in the dynamoDB 
        //NOTE : payload has to be passed as "object"
        await API.graphql(graphqlOperation(deletePost, {input}))

     }


    render(){

        const post = this.props.data;

        return (
          <button
            onClick={()=>{ this.handleDeletePost(post.id) }}
          >Delete
          </button>
        )
    }
}


export default DeletePost;

