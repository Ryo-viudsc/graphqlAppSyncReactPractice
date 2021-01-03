import React, {Component} from 'react';




class EditPost extends Component {


  state = {

      show : false,
      id: "",
      postOwnerId:"",
      postOwnerUsername: "",
      postTitle: "",
      postBody: "",
  }


  handleModal = () => {
      
      this.setState({show : !this.state.show})
      document.body.scrollTop = 0;
      document.document.scrollTop = 0;

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

  render(){
    return(
        <>
              {this.state.show && (
                  <div className="modal">
                    <button className="close"
                    onClick={this.handleModal}>
                      X
                    </button>


                  </div>
              )}


            <button OnClick={this.handleModal}> Edit </button>

        </>

  }
}


export default EditPost;