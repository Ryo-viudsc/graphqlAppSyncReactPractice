import React, {Component} from 'react';
import { Auth } from 'aws-amplify';
import { createComment } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';



class CreateCommentPost extends Component {
   
    //note that each comment  will have the comment ownerID 
    //one post can have a lot of comments 
    state = {
        commentOwnerId: " ",
        commentOwnerusername: " ",
        content: ""
     }


     componentDidMount = async () => {
       //first you need to get user names 
       //from the current userID 

       //maybe should try console.log() with 
       //user object inside of componentDidMount

        await Auth.currentUserInfo()
         .then((user)=>{

            this.setState({
              commentOwnerId: user.attributes.sub, 
              commentOwnerusername: user.username
            })
         })
     }
 

     handleChangeContent = event => this.setState({content: event.target.value});

     //when making handleAddComment function, 
     //you go see the mutation file and what is provided in 
     //each mutation component 
     //in this case, createComment has "content" and createdAt field 
     //id, commentOwnerId, commentOwnerUsername, 

     handleAddComment = async event => {

        event.preventDefault();
        const input = {
          commentPostId: this.props.postId,
          commentOwnerId: this.state.commentOwnerId,
          commentOwnerUsername: this.state.commentOwnerUsername,
          content: this.state.content,
          createdAt: new Date().toISOString()
         }

         //here goes the API call to submit the new comment 
         await API.graphql(graphqlOperation(createComment, {input}));
          

         console.log("the end of handleAddComment")

         //handleAddComment is invoked right after 
         //the submit button is clicked 
          this.setState({content: ""});
          
     }
     
    


    render(){
      return(
          <div>
              <form 
                  className="add-comment"
                  onSubmit={this.handleAddComment} //submitHandler just right above
              >
                    <textarea 
                        type="text"
                        name="content"
                        rows="3"
                        cols="40"
                        required
                        placeholder="Add your comment"
                        value={this.state.content}
                        onChange={this.handleChangeContent}
                    />
                    <input 
                      type="submit"
                      className="btn"
                      style={{ fontSize : '19px'}}
                      value="Add Comment"
                    />
              </form>
          </div>
      )
    }
}


export default CreateCommentPost; 
