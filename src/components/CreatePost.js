import React, {Component} from 'react';
import {createPost} from "../graphql/mutations";
import { API, graphqlOperation } from 'aws-amplify';



class CreatePost extends Component {

  state = {
    postOwnerId: "",
    postOwnerUsername: "",
    postTitle:"",
    postBody: ""
  }
   
  componentDidMount = async () => {
      //Todo 




  };

  //UTILITY FUNCTION TO KEEP UPDATING THE STATE INFO 
  //EVEN WHILE USERS ARE TYPING 
  //all this do is to add items to instances 
  //retrieve the info and set it to the state 
  handleChangePost = event => this.setState({
    [event.target.name] : event.target.value
    
  });


  handleAddPost = async event => {
      
      event.preventDefault();
      // In this case, a preventDefault is 
      //called on the event when submitting the form to prevent a browser reload/refresh. 
       
      const input = {
          postOwnerId: "Ryo test",//this.state.postOwnerId,
          postOwnerUsername: "Ryo Kihara", // this.state.postOwnerUsername,
          posttitle : this.state.postTitle,
          postBody: this.state.postBody,
          createdAt: new Date().toISOString()
      };
      await API.graphql(graphqlOperation(createPost, { input }));

      //clean the state 
      this.setState({postTitle: "", postBody: ""});

  } 



  render(){
      return(
        <form className="add-post"
              onSubmit={this.handleAddPost}
        >
            <input style={{font: '19px'}}
                type="text" placeholder="Title"
                name="postTitle"
                required
                value={this.state.postTitle}//attach the state
                onChange={this.handleChangePost} //we need this

              />
            <textarea
              type="text"
              name="postBody"
              rows="3"
              cols="40"
              placeholder="New Blog Post" 
              value={this.state.postBody}
              onChange={this.handleChangePost}
             />

            <input 
                type="submit"
                className="btn"
                style={{fontSize: '19px'}}
            />

        </form>
      )
  }
}


export default CreatePost; 