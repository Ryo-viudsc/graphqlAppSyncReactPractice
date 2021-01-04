import React, {Component} from 'react';
import {Auth, API, graphqlOperation} from "aws-amplify";
import {updatePost} from "../graphql/mutations";

class EditPost extends Component {

  state = {
      show : false,
      id: "",
      postOwnerId:"",
      postOwnerUsername: "",
      postTitle: "",
      postBody: "",
      postData: {
        postTitle: this.props.postTitle,
        postBody: this.props.postBody
      }
  }

  handleModal = () => {
      this.setState({show : !this.state.show})
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }


  //after editting the posts 
  //it needs to be uploaded 
  handleUpdatePost = async (event) => {
        event.preventDefault(); //preventing users from 
        //uploading the empty data at first 

        const input = {
           id : this.props.id,
           postOwnerId: this.state.postOwnerId,
           postOwnerUsername: this.state.postOwnerUsername,
           postTitle: this.state.postData.postTitle,
           postBody: this.state.postData.postBody
        }

        await API.graphql(graphqlOperation(updatePost, { input }));

        //force close the modal 
        this.setState({show : !this.state.show})

  }


  handleTitle = event  => {
        this.setState({
          postData: {...this.state.postData, postTitle: event.target.value }
        })
  }


  handleBody = event => {
        this.setState({
          postData : {...this.state.postData, 
            postBody: event.target.value //this is from onChange of the input
          }})
  }


  //whenever component is ready,
  //componentDidMount() is only called once, on the client, 
  //compared to componentWillMount() which is called twice, 
  //once to the server and once on the client. 
  componentWillMount = async () => {

    await Auth.currentUserInfo()
    .then(user => {
      this.setState({
        postOwnerId: user.attributes.sub,
        postOwnerUsername: user.username
      })
    })
  };

  // called fragment 
  render(){
    return(
        <>
              {this.state.show && (
                  <div className="modal">
                    <button className="close"
                      onClick={this.handleModal}>
                      X
                    </button>
                    <form className="add-post"
                          onSubmit={(event) => this.handleUpdatePost(event)}>
                            
                          <input style={{fontSize : "19px"}}
                                  type="text"
                                  placeholder="Title"
                                  name="postTitle"
                                  value={this.state.postData.postTitle}
                                  onChange={this.handleTitle}
                           />  

                          <input style={{height: "150px", fontSize: "19px"}}
                                 type="text"
                                 placeholder="Edit here"
                                 name="postBody"
                                 value={this.state.postData.postBody}
                                 onChange={this.handleBody}   
                          />  
                          <button> Update Post </button>
                      </form>
                  </div>
              )}
            <button onClick={this.handleModal}> Edit </button>

        </>
    )
  }
}


export default EditPost;