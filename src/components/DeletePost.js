import React, {Component} from 'react';



class DeletePost extends Component {


     handleDeletePost = async postId => {
        const input = { 
          id : postId
        }

        //delete the actual post in the dynamoDB 
        //NOTE : payload has to be passed as "object"
        await API.graphql(graphqlOperation(deletePost, input))

     }


    render(){

        const post = this.props.data;

        return (
          <button
            oClick={()=>{ this.handleDeletePost(post.id) }}
          >Delete
          </button>
        )
    }
}


export default DeletePost;

