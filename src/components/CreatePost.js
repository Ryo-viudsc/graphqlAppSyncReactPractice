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
          postOwnerId: this.state.postOwnerId,
          postOwnerUsername: this.state.postOwnerUsername,
          posttitle : this.state.postTitle,
          postBody: this.state.postBody,
          createdAt: new Date().toISOString()
      };

      await API.graphql(graphqlOperation(createPost, { input }));

      this.setState({postTitle: "", postBody: ""});

  } 



  render(){
      return(
        <form className="add-post"
              onSubmit={this.handleAddPost()}
        >
            <input style={{font: '19px'}}
                type="text" placeholder="Title"
                name="postTitle"
                required
              />
            <textarea
              type="text"
              name="postBody"
              rows="3"
              cols="40"
              placeholder="New Blog Post" 
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